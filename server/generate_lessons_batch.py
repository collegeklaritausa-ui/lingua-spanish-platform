#!/usr/bin/env python3
"""
Prize2Pride - Batch Lesson Generator
Generates 10 lessons at a time for each CEFR level
"""

import json
import os
import sys
from openai import OpenAI

client = OpenAI()

LEVEL_TOPICS = {
    'A1': [
        ('greetings', 'Saludos y presentaciones básicas'),
        ('numbers', 'Números del 1 al 100'),
        ('colors', 'Los colores'),
        ('family', 'La familia'),
        ('food', 'Comida y bebidas'),
        ('time', 'La hora y el tiempo'),
        ('weather', 'El clima'),
        ('body', 'Partes del cuerpo'),
        ('clothes', 'La ropa'),
        ('house', 'La casa y habitaciones'),
        ('animals', 'Los animales'),
        ('professions', 'Las profesiones'),
        ('verbs_ser_estar', 'Verbos ser y estar'),
        ('verbs_tener_hacer', 'Verbos tener y hacer'),
        ('adjectives', 'Adjetivos básicos'),
        ('prepositions', 'Preposiciones de lugar'),
        ('questions', 'Preguntas básicas'),
        ('shopping', 'De compras'),
        ('directions', 'Direcciones'),
        ('school', 'En la escuela'),
    ],
    'A2': [
        ('daily_routine', 'Rutinas diarias'),
        ('past_preterite', 'Pretérito indefinido'),
        ('past_imperfect', 'Pretérito imperfecto'),
        ('future', 'El futuro'),
        ('reflexive', 'Verbos reflexivos'),
        ('travel', 'Viajes y vacaciones'),
        ('transport', 'Transporte'),
        ('health', 'Salud y médico'),
        ('emotions', 'Emociones y sentimientos'),
        ('restaurant', 'En el restaurante'),
        ('hotel', 'En el hotel'),
        ('shopping_adv', 'Compras avanzadas'),
        ('city', 'La ciudad'),
        ('comparisons', 'Comparativos y superlativos'),
        ('direct_objects', 'Pronombres de objeto directo'),
        ('indirect_objects', 'Pronombres de objeto indirecto'),
        ('commands', 'El imperativo'),
        ('holidays', 'Fiestas y celebraciones'),
        ('technology', 'Tecnología básica'),
        ('hobbies', 'Pasatiempos y deportes'),
    ],
    'B1': [
        ('opinions', 'Expresar opiniones'),
        ('subjunctive_present', 'Subjuntivo presente'),
        ('conditional', 'El condicional'),
        ('travel_situations', 'Situaciones de viaje'),
        ('work', 'El trabajo'),
        ('education', 'La educación'),
        ('media', 'Medios de comunicación'),
        ('technology_adv', 'Tecnología avanzada'),
        ('environment', 'El medio ambiente'),
        ('relationships', 'Relaciones personales'),
        ('culture', 'Cultura y tradiciones'),
        ('storytelling', 'Contar historias'),
        ('advice', 'Dar consejos'),
        ('complaints', 'Quejas y reclamaciones'),
        ('formal_informal', 'Registro formal e informal'),
        ('health_wellness', 'Salud y bienestar'),
        ('housing', 'Vivienda'),
        ('finance', 'Finanzas básicas'),
    ],
    'B2': [
        ('subjunctive_all', 'Subjuntivo todos los tiempos'),
        ('passive', 'Voz pasiva'),
        ('current_events', 'Actualidad'),
        ('social_issues', 'Temas sociales'),
        ('politics', 'Política'),
        ('economics', 'Economía'),
        ('science', 'Ciencia'),
        ('arts', 'Arte y cultura'),
        ('literature', 'Literatura'),
        ('idioms', 'Expresiones idiomáticas'),
        ('regional', 'Variaciones regionales'),
        ('debates', 'Debates'),
        ('presentations', 'Presentaciones'),
        ('negotiations', 'Negociaciones'),
        ('hypotheticals', 'Situaciones hipotéticas'),
        ('criticism', 'Crítica y opinión'),
        ('academic', 'Escritura académica'),
    ],
    'C1': [
        ('professional', 'Español profesional'),
        ('legal', 'Español legal'),
        ('medical', 'Español médico'),
        ('technical', 'Español técnico'),
        ('academic_adv', 'Español académico'),
        ('literature_analysis', 'Análisis literario'),
        ('philosophy', 'Filosofía'),
        ('nuanced', 'Expresión matizada'),
        ('implicit', 'Significados implícitos'),
        ('cultural_refs', 'Referencias culturales'),
        ('humor', 'Humor e ironía'),
        ('dialects', 'Dialectos regionales'),
        ('historical', 'Español histórico'),
        ('journalism', 'Periodismo'),
        ('diplomacy', 'Diplomacia'),
    ],
    'C2': [
        ('literary_advanced', 'Análisis literario avanzado'),
        ('philosophical', 'Discurso filosófico'),
        ('legal_advanced', 'Español legal avanzado'),
        ('translation', 'Traducción técnica'),
        ('interpretation', 'Interpretación simultánea'),
        ('cultural_subtleties', 'Sutilezas culturales'),
        ('dialectal_mastery', 'Dominio dialectal'),
        ('historical_texts', 'Textos históricos'),
        ('academic_publishing', 'Publicación académica'),
        ('native_idioms', 'Modismos nativos'),
    ],
}

def generate_10_lessons(level: str, topic: str, topic_es: str, batch_num: int) -> list:
    """Generate exactly 10 lessons for a topic."""
    
    level_desc = {
        'A1': 'absolute beginner - basic vocabulary, present tense only, very simple sentences',
        'A2': 'elementary - daily situations, past tenses, simple conversations',
        'B1': 'intermediate - opinions, subjunctive intro, conditional, travel',
        'B2': 'upper-intermediate - complex topics, all subjunctive, debates, abstract ideas',
        'C1': 'advanced - professional, nuanced expression, regional variations',
        'C2': 'mastery - native-like, literary analysis, philosophical discourse'
    }
    
    prompt = f"""Generate exactly 10 Spanish lessons for CEFR level {level} on the topic "{topic}" ({topic_es}).

Level: {level_desc[level]}

Return a JSON array with exactly 10 lessons. Each lesson:
{{
  "id": "{level.lower()}-{topic}-{batch_num:02d}-XX",
  "slug": "{level.lower()}-{topic}-{batch_num}-X",
  "cefr_level": "{level}",
  "category": "{topic}",
  "title_en": "English title",
  "title_es": "Spanish title",
  "description_en": "2 sentence description",
  "description_es": "2 sentence description in Spanish",
  "objectives": ["objective 1", "objective 2", "objective 3"],
  "estimated_minutes": 20,
  "vocabulary": [
    {{"spanish": "word", "pronunciation": "phonetic", "english": "translation", "part_of_speech": "noun", "example_es": "Spanish sentence", "example_en": "English translation"}}
  ],
  "grammar_points": ["grammar point 1", "grammar point 2"],
  "cultural_note": "Cultural insight",
  "exercises": [
    {{"id": "ex1", "type": "multiple_choice", "question": "Question?", "options": ["A", "B", "C", "D"], "correct_answer": "A", "explanation": "Why A is correct", "points": 10}}
  ]
}}

Include 6-8 vocabulary items and 3-4 exercises per lesson. Make each lesson unique within the topic.
Return ONLY valid JSON array, no markdown."""

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "You are an expert Spanish curriculum designer. Return only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.8,
            max_tokens=12000
        )
        
        content = response.choices[0].message.content.strip()
        if content.startswith('```'):
            content = content.split('\n', 1)[1] if '\n' in content else content[3:]
        if content.endswith('```'):
            content = content[:-3]
        
        lessons = json.loads(content)
        return lessons if isinstance(lessons, list) else []
    except Exception as e:
        print(f"Error: {e}")
        return []

def main():
    if len(sys.argv) < 3:
        print("Usage: python generate_lessons_batch.py <LEVEL> <TOPIC_INDEX>")
        sys.exit(1)
    
    level = sys.argv[1].upper()
    topic_idx = int(sys.argv[2])
    batch_num = int(sys.argv[3]) if len(sys.argv) > 3 else 1
    
    if level not in LEVEL_TOPICS:
        print(f"Invalid level: {level}")
        sys.exit(1)
    
    topics = LEVEL_TOPICS[level]
    if topic_idx >= len(topics):
        print(f"Invalid topic index: {topic_idx}")
        sys.exit(1)
    
    topic, topic_es = topics[topic_idx]
    
    print(f"Generating 10 lessons for {level} - {topic} (batch {batch_num})...")
    lessons = generate_10_lessons(level, topic, topic_es, batch_num)
    
    if lessons:
        output_dir = f"generated_lessons/{level}"
        os.makedirs(output_dir, exist_ok=True)
        
        filename = f"{output_dir}/{topic}_batch{batch_num:02d}.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(lessons, f, ensure_ascii=False, indent=2)
        
        print(f"✓ Generated {len(lessons)} lessons -> {filename}")
    else:
        print("✗ Failed to generate lessons")

if __name__ == "__main__":
    main()
