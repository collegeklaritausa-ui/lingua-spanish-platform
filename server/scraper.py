import requests
from bs4 import BeautifulSoup
import json
import re
from typing import List, Dict, Optional
from openai import OpenAI
import os

# Initialize OpenAI client (pre-configured in the sandbox environment)
client = OpenAI()

# --- Configuration ---
# Target URL for scraping (Practica Español News Archive)
BASE_URL = "https://practiceespanol.com"
NEWS_ARCHIVE_URL = f"{BASE_URL}/news/"

# --- LLM Functions ---

def determine_cefr_level(text: str) -> str:
    """Uses LLM to determine the CEFR level of a given Spanish text."""
    print("Determining CEFR level with LLM...")
    prompt = f"""Analyze the following Spanish text and determine its CEFR level (A1, A2, B1, B2, C1).
    Return ONLY the CEFR code (e.g., A1, B2, C1) and nothing else.

    TEXT:
    ---
    {text[:2000]}
    ---
    """
    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "You are an expert in the Common European Framework of Reference for Languages (CEFR). Your task is to analyze Spanish text and output only the corresponding CEFR level (A1, A2, B1, B2, C1)."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.0,
            max_tokens=5
        )
        level = response.choices[0].message.content.strip().upper()
        if level in ['A1', 'A2', 'B1', 'B2', 'C1']:
            return level
        return "B1" # Default to B1 if LLM output is unexpected
    except Exception as e:
        print(f"LLM error: {e}")
        return "B1"

# --- Scraping Functions ---

def fetch_page(url: str, save_html: bool = False) -> Optional[BeautifulSoup]:
    """Fetches a URL and returns a BeautifulSoup object."""
    try:
        headers = {'User-Agent': 'Prize2Pride-Scraper/1.0'}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        if save_html:
            with open("debug_archive.html", "w", encoding="utf-8") as f:
                f.write(response.text)
            print("Saved raw HTML to debug_archive.html")
        return BeautifulSoup(response.content, 'html.parser')
    except requests.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None

def scrape_article_links(soup: BeautifulSoup) -> List[str]:
    """Extracts article links from the news archive page."""
    links = []
    # Find all links within the main content area that point to articles
    # The links are typically inside h3.entry-title or h3.elementor-post__title
    for a_tag in soup.select('h3.entry-title a, h3.elementor-post__title a'):
        if 'href' in a_tag.attrs:
            links.append(a_tag['href'])
    return links

def scrape_article_content(url: str, index: int) -> Optional[Dict]:
    """Scrapes the content and translation from a single article page."""
    soup = fetch_page(url)
    if soup:
        with open(f"debug_article_{index}.html", "w", encoding="utf-8") as f:
            f.write(str(soup))
        print(f"Saved raw article HTML to debug_article_{index}.html")
    if not soup:
        return None

    try:
        # Title
        title_tag = soup.find('h1', class_='entry-title')
        title = title_tag.text.strip() if title_tag else "No Title"

        # Find the main content area, trying a few common containers
        content_container = soup.find('div', class_='entry-content') or soup.find('div', {'data-widget_type': 'theme-post-content.default'}) or soup.find('article')
        if not content_container:
            return None

        spanish_content = ""
        english_content = ""

        # Find all columns that contain the content
        columns = content_container.find_all('div', class_=re.compile(r'wp-block-column'))

        for column in columns:
            # Check if this column contains the Spanish News header
            if column.find('h2', string=re.compile(r'Spanish News', re.IGNORECASE)):
                for p_tag in column.find_all('p'):
                    spanish_content += p_tag.text.strip() + "\n\n"
            
            # Check if this column contains the English Translation header
            elif column.find('h2', string=re.compile(r'English Translation', re.IGNORECASE)):
                for p_tag in column.find_all('p'):
                    english_content += p_tag.text.strip() + "\n\n"

        # Clean up content
        spanish_content = spanish_content.strip()
        english_content = english_content.strip()

        if not spanish_content:
            return None

        # Determine CEFR level
        cefr_level = determine_cefr_level(spanish_content)

        return {
            "title": title,
            "slug": re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-'),
            "url": url,
            "content": spanish_content,
            "contentEnglish": english_content,
            "cefrLevel": cefr_level,
        }

    except Exception as e:
        print(f"Error processing article {url}: {e}")
        return None

def main_scraper(limit: int = 5) -> List[Dict]:
    """Main function to orchestrate the scraping process."""
    print(f"Starting Prize2Pride content scraper. Target: {NEWS_ARCHIVE_URL}")
    soup = fetch_page(NEWS_ARCHIVE_URL, save_html=True)
    if not soup:
        return []

    article_links = scrape_article_links(soup)
    print(f"Found {len(article_links)} potential articles. Scraping up to {limit}...")

    scraped_data = []
    for i, link in enumerate(article_links):
        if i >= limit:
            break
        full_url = link if link.startswith('http') else f"{BASE_URL}{link}"
        print(f"Scraping article {i+1}/{limit}: {full_url}")
        article_data = scrape_article_content(full_url, i)
        if article_data:
            scraped_data.append(article_data)
            print(f" -> Success. Level: {article_data['cefrLevel']}")
        else:
            print(" -> Failed to scrape content.")

    return scraped_data

if __name__ == "__main__":
    # Set a higher limit for a more comprehensive run
    data = main_scraper(limit=10)
    
    # Save the results to a JSON file
    output_path = "/home/ubuntu/lingua-spanish-platform/scraped_lessons.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    
    print(f"\nScraping complete. Saved {len(data)} lessons to {output_path}")
