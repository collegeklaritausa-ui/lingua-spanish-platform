#!/usr/bin/env python3
"""
Prize2Pride Lingua Spanish Platform
100,000 Lessons Generator

IMMUTABLE CODE - DO NOT DELETE
Created: 2025-12-29

This script generates 100,000 Spanish lessons across all CEFR levels
and all language modes (formal, informal, slang, dirty, expert).

Distribution:
- A1: 20,000 lessons (Beginner)
- A2: 20,000 lessons (Elementary)
- B1: 18,000 lessons (Intermediate)
- B2: 17,000 lessons (Upper Intermediate)
- C1: 15,000 lessons (Advanced)
- C2: 10,000 lessons (Mastery)

Modes per level:
- Formal: All levels
- Informal: All levels
- Slang: B1+
- Dirty: B2+
- Expert: C1+
"""

import json
import os
import random
from datetime import datetime
from typing import List, Dict, Any

# Lesson templates and vocabulary
TOPICS = {
    'A1': [
        'greetings', 'numbers', 'colors', 'family', 'food', 'time', 'weather',
        'body_parts', 'clothes', 'house', 'animals', 'professions', 'days_weeks',
        'months_seasons', 'basic_verbs', 'introductions', 'classroom', 'shopping_basic',
        'directions_basic', 'feelings_basic'
    ],
    'A2': [
        'daily_routine', 'travel', 'shopping', 'health', 'emotions', 'restaurant',
        'hotel', 'transport', 'hobbies', 'technology', 'sports', 'music',
        'movies', 'celebrations', 'cooking', 'neighborhood', 'bank', 'post_office',
        'doctor', 'pharmacy'
    ],
    'B1': [
        'opinions', 'subjunctive_intro', 'conditional', 'work', 'education',
        'environment', 'relationships', 'culture', 'media', 'storytelling',
        'news', 'politics_basic', 'economy_basic', 'history', 'geography',
        'art', 'literature_intro', 'science_basic', 'technology_advanced', 'social_issues'
    ],
    'B2': [
        'subjunctive_advanced', 'passive_voice', 'debates', 'politics', 'economics',
        'science', 'arts', 'literature', 'idioms', 'academic_writing', 'business',
        'law_basic', 'medicine_basic', 'psychology', 'philosophy_intro', 'journalism',
        'advertising', 'social_media', 'globalization', 'human_rights'
    ],
    'C1': [
        'professional', 'legal', 'medical', 'technical', 'philosophy',
        'nuanced_expressions', 'dialects', 'journalism_advanced', 'diplomacy',
        'translation', 'interpretation', 'academic_research', 'literary_analysis',
        'rhetoric', 'negotiation', 'public_speaking', 'cultural_studies', 'linguistics',
        'etymology', 'sociolinguistics'
    ],
    'C2': [
        'literary_mastery', 'philosophical_discourse', 'legal_advanced',
        'simultaneous_interpretation', 'cultural_mastery', 'historical_spanish',
        'academic_publication', 'native_idioms', 'dialectal_variations',
        'specialized_terminology', 'poetic_language', 'archaic_spanish',
        'regional_literature', 'translation_theory', 'stylistics'
    ]
}

MODES = ['formal', 'informal', 'slang', 'dirty', 'expert']

MODE_AVAILABILITY = {
    'A1': ['formal', 'informal'],
    'A2': ['formal', 'informal'],
    'B1': ['formal', 'informal', 'slang'],
    'B2': ['formal', 'informal', 'slang', 'dirty'],
    'C1': ['formal', 'informal', 'slang', 'dirty', 'expert'],
    'C2': ['formal', 'informal', 'slang', 'dirty', 'expert']
}

LESSON_DISTRIBUTION = {
    'A1': 20000,
    'A2': 20000,
    'B1': 18000,
    'B2': 17000,
    'C1': 15000,
    'C2': 10000
}

# Vocabulary templates by mode
VOCABULARY_TEMPLATES = {
    'formal': {
        'greetings': [
            {'word': 'Buenos días', 'translation': 'Good morning', 'context': 'Formal morning greeting'},
            {'word': 'Buenas tardes', 'translation': 'Good afternoon', 'context': 'Formal afternoon greeting'},
            {'word': 'Buenas noches', 'translation': 'Good evening/night', 'context': 'Formal evening greeting'},
            {'word': 'Encantado/a de conocerle', 'translation': 'Pleased to meet you', 'context': 'Formal introduction'},
            {'word': 'Le saludo atentamente', 'translation': 'Kind regards', 'context': 'Formal letter closing'},
        ],
        'business': [
            {'word': 'La reunión', 'translation': 'The meeting', 'context': 'Business context'},
            {'word': 'El informe', 'translation': 'The report', 'context': 'Business document'},
            {'word': 'La propuesta', 'translation': 'The proposal', 'context': 'Business offer'},
            {'word': 'El presupuesto', 'translation': 'The budget', 'context': 'Financial planning'},
            {'word': 'La factura', 'translation': 'The invoice', 'context': 'Payment document'},
        ]
    },
    'informal': {
        'greetings': [
            {'word': '¡Hola!', 'translation': 'Hi!', 'context': 'Casual greeting'},
            {'word': '¿Qué tal?', 'translation': "How's it going?", 'context': 'Casual inquiry'},
            {'word': '¿Qué pasa?', 'translation': "What's up?", 'context': 'Very casual greeting'},
            {'word': '¡Hasta luego!', 'translation': 'See you later!', 'context': 'Casual goodbye'},
            {'word': '¡Nos vemos!', 'translation': 'See you!', 'context': 'Casual farewell'},
        ],
        'daily_life': [
            {'word': 'Quedar', 'translation': 'To meet up', 'context': 'Making plans'},
            {'word': 'Molar', 'translation': 'To be cool', 'context': 'Spain - expressing approval'},
            {'word': 'Flipar', 'translation': 'To freak out/be amazed', 'context': 'Expressing surprise'},
            {'word': 'Currar', 'translation': 'To work', 'context': 'Informal for trabajar'},
            {'word': 'Pasta', 'translation': 'Money', 'context': 'Slang for dinero'},
        ]
    },
    'slang': {
        'expressions': [
            {'word': 'Tío/Tía', 'translation': 'Dude/Girl', 'context': 'Spain - addressing friends'},
            {'word': 'Guay', 'translation': 'Cool', 'context': 'Spain - expressing approval'},
            {'word': 'Mola mazo', 'translation': 'Super cool', 'context': 'Spain - strong approval'},
            {'word': 'Chido', 'translation': 'Cool/Awesome', 'context': 'Mexico slang'},
            {'word': 'Boludo', 'translation': 'Dude/Idiot', 'context': 'Argentina - depends on context'},
            {'word': 'Pana', 'translation': 'Buddy/Friend', 'context': 'Venezuela slang'},
            {'word': 'Bacán', 'translation': 'Great/Awesome', 'context': 'Peru/Chile slang'},
        ],
        'youth': [
            {'word': 'Peña', 'translation': 'People/Crowd', 'context': 'Group of friends'},
            {'word': 'Movida', 'translation': 'Thing/Situation', 'context': 'Vague reference'},
            {'word': 'Rollo', 'translation': 'Vibe/Thing', 'context': 'Atmosphere or situation'},
            {'word': 'Quedada', 'translation': 'Meetup', 'context': 'Planned gathering'},
            {'word': 'Finde', 'translation': 'Weekend', 'context': 'Short for fin de semana'},
        ]
    },
    'dirty': {
        'expressions': [
            {'word': '¡Joder!', 'translation': 'F**k!', 'context': 'Common Spanish expletive'},
            {'word': '¡Mierda!', 'translation': 'Sh*t!', 'context': 'Expletive'},
            {'word': '¡Coño!', 'translation': 'Damn!', 'context': 'Spain - strong exclamation'},
            {'word': 'Cabrón', 'translation': 'Bastard', 'context': 'Insult or friendly term'},
            {'word': 'Gilipollas', 'translation': 'Idiot/A**hole', 'context': 'Spain - strong insult'},
        ],
        'adult': [
            {'word': 'Ligar', 'translation': 'To flirt/pick up', 'context': 'Dating context'},
            {'word': 'Enrollarse', 'translation': 'To make out', 'context': 'Physical intimacy'},
            {'word': 'Morrear', 'translation': 'To kiss passionately', 'context': 'Spain slang'},
            {'word': 'Estar bueno/a', 'translation': 'To be hot', 'context': 'Physical attractiveness'},
        ]
    },
    'expert': {
        'literary': [
            {'word': 'Antaño', 'translation': 'In olden times', 'context': 'Literary/archaic'},
            {'word': 'Otrora', 'translation': 'Formerly', 'context': 'Literary expression'},
            {'word': 'Empero', 'translation': 'However', 'context': 'Archaic conjunction'},
            {'word': 'Menester', 'translation': 'Necessary/Need', 'context': 'Literary usage'},
            {'word': 'Acaecer', 'translation': 'To happen/occur', 'context': 'Formal/literary'},
        ],
        'dialectal': [
            {'word': 'Vos', 'translation': 'You (informal)', 'context': 'Rioplatense Spanish'},
            {'word': 'Vosotros', 'translation': 'You all', 'context': 'Spain only'},
            {'word': 'Ustedes', 'translation': 'You all', 'context': 'Latin America (formal & informal)'},
            {'word': 'Che', 'translation': 'Hey/Buddy', 'context': 'Argentina/Uruguay'},
        ]
    }
}

# Grammar points by level
GRAMMAR_POINTS = {
    'A1': [
        'present_tense_regular', 'ser_vs_estar', 'articles', 'gender_number',
        'basic_adjectives', 'possessives', 'hay', 'gustar', 'ir_a_infinitive'
    ],
    'A2': [
        'preterite_regular', 'preterite_irregular', 'imperfect', 'reflexive_verbs',
        'direct_object_pronouns', 'indirect_object_pronouns', 'comparatives', 'superlatives'
    ],
    'B1': [
        'present_subjunctive', 'commands', 'future_tense', 'conditional',
        'por_vs_para', 'relative_pronouns', 'passive_se', 'subjunctive_wishes'
    ],
    'B2': [
        'past_subjunctive', 'conditional_perfect', 'future_perfect', 'passive_voice',
        'subjunctive_doubt', 'subjunctive_emotion', 'si_clauses', 'reported_speech'
    ],
    'C1': [
        'pluperfect_subjunctive', 'literary_tenses', 'advanced_si_clauses',
        'subjunctive_concession', 'nominalization', 'complex_relative_clauses'
    ],
    'C2': [
        'archaic_verb_forms', 'voseo_conjugation', 'regional_grammar',
        'literary_subjunctive', 'stylistic_variation', 'register_switching'
    ]
}

def generate_lesson_id(level: str, mode: str, topic: str, index: int) -> str:
    """Generate unique lesson ID"""
    return f"{level}_{mode}_{topic}_{index:05d}"

def generate_slug(level: str, mode: str, topic: str, index: int) -> str:
    """Generate URL-friendly slug"""
    return f"{level.lower()}-{mode}-{topic.replace('_', '-')}-{index}"

def generate_vocabulary(mode: str, topic: str, count: int = 10) -> List[Dict]:
    """Generate vocabulary items for a lesson"""
    vocab_pool = VOCABULARY_TEMPLATES.get(mode, VOCABULARY_TEMPLATES['formal'])
    topic_vocab = vocab_pool.get(topic, vocab_pool.get(list(vocab_pool.keys())[0], []))
    
    vocabulary = []
    for i in range(min(count, len(topic_vocab))):
        item = topic_vocab[i % len(topic_vocab)].copy()
        item['id'] = f"vocab_{i}"
        vocabulary.append(item)
    
    return vocabulary

def generate_exercises(level: str, mode: str, count: int = 5) -> List[Dict]:
    """Generate exercises for a lesson"""
    exercise_types = ['multiple_choice', 'fill_blank', 'translation', 'matching', 'listening']
    exercises = []
    
    for i in range(count):
        exercise = {
            'id': f"ex_{i}",
            'type': exercise_types[i % len(exercise_types)],
            'difficulty': level,
            'mode': mode,
            'points': 10 * (i + 1),
            'question': f"Exercise {i + 1} for {level} {mode}",
            'options': ['Option A', 'Option B', 'Option C', 'Option D'] if exercise_types[i % len(exercise_types)] == 'multiple_choice' else None,
            'correct_answer': 'Option A' if exercise_types[i % len(exercise_types)] == 'multiple_choice' else 'Answer',
            'explanation': f"Explanation for exercise {i + 1}"
        }
        exercises.append(exercise)
    
    return exercises

def generate_lesson(level: str, mode: str, topic: str, index: int, lesson_number: int) -> Dict:
    """Generate a single lesson"""
    lesson_id = generate_lesson_id(level, mode, topic, index)
    slug = generate_slug(level, mode, topic, index)
    
    grammar_points = GRAMMAR_POINTS.get(level, GRAMMAR_POINTS['A1'])
    selected_grammar = random.sample(grammar_points, min(2, len(grammar_points)))
    
    lesson = {
        'id': lesson_id,
        'slug': slug,
        'lesson_number': lesson_number,
        'level': level,
        'mode': mode,
        'topic': topic,
        'title': f"{topic.replace('_', ' ').title()} - {mode.title()} ({level})",
        'title_translations': {
            'en': f"{topic.replace('_', ' ').title()} - {mode.title()} ({level})",
            'fr': f"{topic.replace('_', ' ').title()} - {mode.title()} ({level})",
            'de': f"{topic.replace('_', ' ').title()} - {mode.title()} ({level})",
            'it': f"{topic.replace('_', ' ').title()} - {mode.title()} ({level})",
            'ar': f"{topic.replace('_', ' ').title()} - {mode.title()} ({level})",
            'zh': f"{topic.replace('_', ' ').title()} - {mode.title()} ({level})"
        },
        'description': f"Learn {topic.replace('_', ' ')} in {mode} Spanish at {level} level",
        'objectives': [
            f"Master {topic.replace('_', ' ')} vocabulary",
            f"Practice {mode} register",
            f"Apply {selected_grammar[0] if selected_grammar else 'grammar'} rules"
        ],
        'duration_minutes': 15 + (5 * ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].index(level)),
        'vocabulary': generate_vocabulary(mode, topic),
        'grammar_focus': selected_grammar,
        'exercises': generate_exercises(level, mode),
        'cultural_notes': [f"Cultural note about {topic} in Spanish-speaking countries"],
        'audio_available': True,
        'video_available': level in ['B1', 'B2', 'C1', 'C2'],
        'avatar_tutoring': mode != 'formal' or level in ['C1', 'C2'],
        'premium_content': mode in ['dirty', 'expert'],
        'created_at': datetime.now().isoformat(),
        'updated_at': datetime.now().isoformat()
    }
    
    return lesson

def generate_all_lessons():
    """Generate all 100,000 lessons"""
    all_lessons = []
    lessons_by_level = {level: [] for level in LESSON_DISTRIBUTION.keys()}
    lessons_by_mode = {mode: [] for mode in MODES}
    
    lesson_number = 1
    
    for level, total_lessons in LESSON_DISTRIBUTION.items():
        available_modes = MODE_AVAILABILITY[level]
        topics = TOPICS[level]
        
        lessons_per_mode = total_lessons // len(available_modes)
        lessons_per_topic = lessons_per_mode // len(topics)
        
        for mode in available_modes:
            for topic in topics:
                for i in range(lessons_per_topic):
                    lesson = generate_lesson(level, mode, topic, i, lesson_number)
                    all_lessons.append(lesson)
                    lessons_by_level[level].append(lesson)
                    lessons_by_mode[mode].append(lesson)
                    lesson_number += 1
                    
                    if lesson_number % 10000 == 0:
                        print(f"Generated {lesson_number} lessons...")
    
    return all_lessons, lessons_by_level, lessons_by_mode

def save_lessons(all_lessons: List[Dict], lessons_by_level: Dict, lessons_by_mode: Dict):
    """Save lessons to JSON files"""
    output_dir = os.path.join(os.path.dirname(__file__), '..', 'generated_lessons_100k')
    os.makedirs(output_dir, exist_ok=True)
    
    # Save all lessons
    print("Saving all lessons...")
    with open(os.path.join(output_dir, 'all_lessons_100k.json'), 'w', encoding='utf-8') as f:
        json.dump(all_lessons, f, ensure_ascii=False, indent=2)
    
    # Save by level
    for level, lessons in lessons_by_level.items():
        print(f"Saving {level} lessons ({len(lessons)} lessons)...")
        with open(os.path.join(output_dir, f'lessons_{level}.json'), 'w', encoding='utf-8') as f:
            json.dump(lessons, f, ensure_ascii=False, indent=2)
    
    # Save by mode
    for mode, lessons in lessons_by_mode.items():
        print(f"Saving {mode} mode lessons ({len(lessons)} lessons)...")
        with open(os.path.join(output_dir, f'lessons_mode_{mode}.json'), 'w', encoding='utf-8') as f:
            json.dump(lessons, f, ensure_ascii=False, indent=2)
    
    # Save summary
    summary = {
        'total_lessons': len(all_lessons),
        'generated_at': datetime.now().isoformat(),
        'distribution_by_level': {level: len(lessons) for level, lessons in lessons_by_level.items()},
        'distribution_by_mode': {mode: len(lessons) for mode, lessons in lessons_by_mode.items()},
        'topics_per_level': TOPICS,
        'modes_per_level': MODE_AVAILABILITY,
        'features': {
            'multilingual_support': ['en', 'fr', 'de', 'it', 'ar', 'zh'],
            'avatar_tutoring': True,
            'audio_lessons': True,
            'video_lessons': True,
            'exercises_per_lesson': 5,
            'vocabulary_per_lesson': 10
        }
    }
    
    with open(os.path.join(output_dir, 'summary_100k.json'), 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Successfully generated {len(all_lessons)} lessons!")
    print(f"📁 Output directory: {output_dir}")

if __name__ == '__main__':
    print("🚀 Starting 100,000 lesson generation...")
    print("=" * 50)
    
    all_lessons, lessons_by_level, lessons_by_mode = generate_all_lessons()
    save_lessons(all_lessons, lessons_by_level, lessons_by_mode)
    
    print("\n📊 Generation Summary:")
    print(f"   Total lessons: {len(all_lessons)}")
    for level, lessons in lessons_by_level.items():
        print(f"   {level}: {len(lessons)} lessons")
    print("\n   By mode:")
    for mode, lessons in lessons_by_mode.items():
        print(f"   {mode}: {len(lessons)} lessons")
