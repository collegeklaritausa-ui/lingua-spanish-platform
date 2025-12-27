#!/usr/bin/env python3
"""
Prize2Pride Spanish Platform - Bulk Lesson Generator
Generates 10,000 lessons across CEFR levels A1-C2
"""

import json
import os
import random
from openai import OpenAI

# Initialize OpenAI client
client = OpenAI()

# CEFR Level Distribution (10,000 total lessons)
LEVEL_DISTRIBUTION = {
    'A1': 2000,  # Beginner - most content needed
    'A2': 2000,  # Elementary
    'B1': 1800,  # Intermediate
    'B2': 1700,  # Upper-Intermediate
    'C1': 1500,  # Advanced
    'C2': 1000,  # Mastery - fewer but more complex
}

# Categories per level
CATEGORIES = {
    'A1': [
        'greetings', 'numbers', 'colors', 'family', 'food', 'drinks', 
        'days_weeks', 'months_seasons', 'weather', 'body_parts',
        'clothing', 'house_rooms', 'animals', 'professions', 'countries',
        'basic_verbs', 'adjectives', 'time', 'directions', 'shopping'
    ],
    'A2': [
        'daily_routines', 'past_experiences', 'future_plans', 'hobbies',
        'sports', 'travel', 'transportation', 'health', 'emotions',
        'restaurant', 'hotel', 'shopping_advanced', 'city_places',
        'comparisons', 'reflexive_verbs', 'preterite', 'imperfect',
        'direct_objects', 'indirect_objects', 'commands'
    ],
    'B1': [
        'opinions', 'experiences', 'dreams', 'plans', 'advice',
        'subjunctive_intro', 'conditional', 'travel_situations',
        'work_environment', 'education', 'media', 'technology',
        'environment', 'relationships', 'culture', 'traditions',
        'storytelling', 'news', 'debates_intro', 'formal_informal'
    ],
    'B2': [
        'abstract_concepts', 'current_events', 'social_issues',
        'politics', 'economics', 'science', 'arts', 'literature_intro',
        'subjunctive_advanced', 'passive_voice', 'complex_sentences',
        'idiomatic_expressions', 'regional_variations', 'debates',
        'presentations', 'negotiations', 'hypotheticals', 'criticism',
        'persuasion', 'academic_writing'
    ],
    'C1': [
        'professional_spanish', 'business', 'legal_intro', 'medical',
        'technical', 'academic', 'literature', 'philosophy_intro',
        'nuanced_expression', 'implicit_meaning', 'cultural_references',
        'humor', 'irony', 'regional_dialects', 'historical_spanish',
        'journalism', 'diplomacy', 'advanced_grammar', 'stylistics',
        'translation'
    ],
    'C2': [
        'literary_analysis', 'philosophical_discourse', 'legal_spanish',
        'technical_translation', 'simultaneous_interpretation',
        'cultural_subtleties', 'dialectal_mastery', 'historical_texts',
        'poetry_analysis', 'rhetorical_devices', 'academic_publishing',
        'native_idioms', 'wordplay', 'specialized_domains',
        'conference_interpretation', 'literary_translation'
    ]
}

# Topic templates per category (sample - will be expanded by AI)
TOPIC_TEMPLATES = {
    'A1': {
        'greetings': [
            'Formal greetings in Spanish',
            'Informal greetings with friends',
            'Saying goodbye',
            'Introducing yourself',
            'Asking someone\'s name',
            'Greetings at different times of day',
            'Polite expressions',
            'Meeting new people',
            'Greetings in different Spanish-speaking countries',
            'Phone greetings'
        ],
        'numbers': [
            'Numbers 1-10',
            'Numbers 11-20',
            'Numbers 21-100',
            'Telling your age',
            'Phone numbers',
            'Prices and money',
            'Dates and years',
            'Ordinal numbers',
            'Math operations in Spanish',
            'Large numbers'
        ],
        'food': [
            'Fruits vocabulary',
            'Vegetables vocabulary',
            'Breakfast foods',
            'Lunch and dinner',
            'Desserts and sweets',
            'Ordering at a restaurant',
            'Spanish cuisine basics',
            'Latin American dishes',
            'Cooking verbs',
            'Kitchen items'
        ]
    }
}

def generate_lesson_batch(level: str, category: str, batch_number: int, batch_size: int = 50) -> list:
    """Generate a batch of lessons for a specific level and category."""
    
    level_descriptions = {
        'A1': 'absolute beginner, basic vocabulary, simple present tense, very short sentences',
        'A2': 'elementary, daily situations, past tense introduction, simple conversations',
        'B1': 'intermediate, opinions, subjunctive introduction, travel situations',
        'B2': 'upper-intermediate, complex topics, all subjunctive tenses, debates',
        'C1': 'advanced, professional contexts, nuanced expression, implicit meanings',
        'C2': 'mastery, native-like precision, literary analysis, any specialized domain'
    }
    
    prompt = f"""Generate {batch_size} unique Spanish lessons for CEFR level {level} in the category "{category}".

Level description: {level_descriptions[level]}

For each lesson, provide a JSON object with:
1. "title_en": English title
2. "title_es": Spanish title
3. "description_en": Brief English description (1-2 sentences)
4. "description_es": Brief Spanish description (1-2 sentences)
5. "objectives": Array of 3-4 learning objectives
6. "vocabulary": Array of 5-8 vocabulary items, each with:
   - "spanish": Spanish word/phrase
   - "english": English translation
   - "example_es": Example sentence in Spanish
   - "example_en": Example sentence in English
7. "grammar_points": Array of 2-3 grammar points covered
8. "cultural_note": One cultural insight related to the topic
9. "exercises": Array of 3 exercises, each with:
   - "type": "multiple_choice" | "fill_blank" | "translation"
   - "question": The question
   - "options": Array of 4 options (for multiple_choice)
   - "correct_answer": The correct answer
   - "explanation": Brief explanation

Return ONLY a valid JSON array of {batch_size} lesson objects. No markdown, no explanation, just the JSON array."""

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "You are an expert Spanish language curriculum designer. Generate educational content that is accurate, engaging, and appropriate for the specified CEFR level. Always return valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.8,
            max_tokens=16000
        )
        
        content = response.choices[0].message.content.strip()
        
        # Clean up the response if needed
        if content.startswith('```json'):
            content = content[7:]
        if content.startswith('```'):
            content = content[3:]
        if content.endswith('```'):
            content = content[:-3]
        
        lessons = json.loads(content)
        
        # Add metadata to each lesson
        for i, lesson in enumerate(lessons):
            lesson['id'] = f"{level.lower()}-{category}-{batch_number:03d}-{i+1:03d}"
            lesson['slug'] = f"{level.lower()}-{category}-{batch_number}-{i+1}"
            lesson['cefr_level'] = level
            lesson['category'] = category
            lesson['estimated_minutes'] = random.randint(15, 45) if level in ['A1', 'A2'] else random.randint(25, 60)
        
        return lessons
        
    except Exception as e:
        print(f"Error generating batch for {level}/{category}/{batch_number}: {e}")
        return []


def generate_all_lessons():
    """Generate all 10,000 lessons across all levels."""
    
    all_lessons = []
    
    for level, total_count in LEVEL_DISTRIBUTION.items():
        categories = CATEGORIES[level]
        lessons_per_category = total_count // len(categories)
        remainder = total_count % len(categories)
        
        print(f"\n{'='*60}")
        print(f"Generating {total_count} lessons for level {level}")
        print(f"{'='*60}")
        
        for cat_idx, category in enumerate(categories):
            # Distribute remainder across first few categories
            cat_lesson_count = lessons_per_category + (1 if cat_idx < remainder else 0)
            
            # Generate in batches of 50
            batch_size = 50
            num_batches = (cat_lesson_count + batch_size - 1) // batch_size
            
            print(f"\n  Category: {category} ({cat_lesson_count} lessons, {num_batches} batches)")
            
            for batch_num in range(num_batches):
                current_batch_size = min(batch_size, cat_lesson_count - (batch_num * batch_size))
                
                print(f"    Generating batch {batch_num + 1}/{num_batches} ({current_batch_size} lessons)...")
                
                batch_lessons = generate_lesson_batch(level, category, batch_num + 1, current_batch_size)
                all_lessons.extend(batch_lessons)
                
                print(f"    ✓ Generated {len(batch_lessons)} lessons. Total: {len(all_lessons)}")
    
    return all_lessons


def save_lessons(lessons: list, output_dir: str = "generated_lessons"):
    """Save lessons to JSON files, organized by level."""
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Group by level
    by_level = {}
    for lesson in lessons:
        level = lesson.get('cefr_level', 'unknown')
        if level not in by_level:
            by_level[level] = []
        by_level[level].append(lesson)
    
    # Save per level
    for level, level_lessons in by_level.items():
        filepath = os.path.join(output_dir, f"lessons_{level}.json")
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(level_lessons, f, ensure_ascii=False, indent=2)
        print(f"Saved {len(level_lessons)} lessons to {filepath}")
    
    # Save all lessons
    all_filepath = os.path.join(output_dir, "all_lessons.json")
    with open(all_filepath, 'w', encoding='utf-8') as f:
        json.dump(lessons, f, ensure_ascii=False, indent=2)
    print(f"\nSaved all {len(lessons)} lessons to {all_filepath}")
    
    # Save summary
    summary = {
        "total_lessons": len(lessons),
        "by_level": {level: len(level_lessons) for level, level_lessons in by_level.items()},
        "categories": {level: list(set(l['category'] for l in level_lessons)) for level, level_lessons in by_level.items()}
    }
    
    summary_filepath = os.path.join(output_dir, "summary.json")
    with open(summary_filepath, 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    print(f"Saved summary to {summary_filepath}")


if __name__ == "__main__":
    print("Prize2Pride Spanish Platform - Bulk Lesson Generator")
    print("=" * 60)
    print(f"Target: 10,000 lessons across CEFR levels A1-C2")
    print(f"Distribution: {LEVEL_DISTRIBUTION}")
    print("=" * 60)
    
    lessons = generate_all_lessons()
    save_lessons(lessons)
    
    print("\n" + "=" * 60)
    print("GENERATION COMPLETE!")
    print(f"Total lessons generated: {len(lessons)}")
    print("=" * 60)
