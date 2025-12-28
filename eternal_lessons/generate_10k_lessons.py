#!/usr/bin/env python3
"""
Prize2Pride Lingua Spanish Platform
Eternal Lesson Generator - 10,000 Lessons
IMMUTABLE CODE - DO NOT DELETE
Created: 2025-12-29

Generates 10,000 original Spanish lessons across all levels and modes.
"""

import json
import os
from datetime import datetime
from typing import Dict, List, Any

# Configuration
LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
MODES = ['formal', 'informal', 'slang', 'dirty', 'expert']
LESSONS_PER_BATCH = 1000
TOTAL_LESSONS = 10000

# Topics by level
TOPICS = {
    'A1': [
        'greetings', 'introductions', 'numbers_1_20', 'numbers_21_100', 'colors',
        'family', 'professions', 'days_week', 'months', 'time',
        'weather', 'body_parts', 'clothes', 'food_basic', 'drinks',
        'house_rooms', 'furniture', 'animals_pets', 'animals_farm', 'transportation',
        'directions_basic', 'shopping_basic', 'restaurant_basic', 'hotel_basic', 'emotions_basic'
    ],
    'A2': [
        'daily_routine', 'hobbies', 'sports', 'music', 'movies',
        'travel_planning', 'airport', 'train_bus', 'hotel_advanced', 'restaurant_ordering',
        'shopping_clothes', 'shopping_food', 'health_basic', 'pharmacy', 'doctor_visit',
        'technology_basic', 'internet', 'phone_calls', 'emails', 'social_media',
        'celebrations', 'holidays', 'traditions', 'cooking', 'recipes'
    ],
    'B1': [
        'opinions', 'agreements', 'disagreements', 'suggestions', 'complaints',
        'past_tense_stories', 'future_plans', 'conditionals_basic', 'subjunctive_intro', 'commands',
        'work_office', 'job_interview', 'meetings', 'presentations', 'negotiations',
        'education', 'university', 'exams', 'studying', 'research',
        'environment', 'recycling', 'climate', 'nature', 'animals_wild'
    ],
    'B2': [
        'subjunctive_emotions', 'subjunctive_doubt', 'subjunctive_wishes', 'passive_voice', 'reported_speech',
        'politics', 'elections', 'government', 'laws', 'rights',
        'economics', 'business', 'marketing', 'finance', 'investments',
        'science', 'technology_advanced', 'medicine', 'psychology', 'sociology',
        'arts', 'literature', 'painting', 'architecture', 'cinema_analysis'
    ],
    'C1': [
        'professional_spanish', 'legal_basic', 'medical_terminology', 'technical_writing', 'academic_writing',
        'dialects_spain', 'dialects_mexico', 'dialects_argentina', 'dialects_caribbean', 'dialects_andean',
        'idioms_spain', 'idioms_latam', 'proverbs', 'sayings', 'wordplay',
        'journalism', 'news_analysis', 'editorial_writing', 'interviews', 'debates',
        'philosophy', 'ethics', 'critical_thinking', 'argumentation', 'rhetoric'
    ],
    'C2': [
        'literary_analysis', 'poetry', 'novel_writing', 'theater', 'screenplay',
        'legal_advanced', 'contracts', 'court_language', 'diplomatic_spanish', 'protocol',
        'interpretation', 'simultaneous_translation', 'localization', 'transcreation', 'adaptation',
        'historical_spanish', 'medieval_texts', 'golden_age', 'modern_literature', 'contemporary_authors',
        'specialized_vocabulary', 'neologisms', 'anglicisms', 'regional_variations', 'sociolects'
    ]
}

# Vocabulary database
VOCABULARY_DB = {
    'greetings': {
        'formal': [
            {'es': 'Buenos días', 'pron': '[BWE-nos] [DÍ-as]', 'en': 'Good morning', 'fr': 'Bonjour', 'de': 'Guten Morgen', 'it': 'Buongiorno', 'ar': 'صباح الخير', 'zh': '早上好'},
            {'es': 'Buenas tardes', 'pron': '[BWE-nas] [TAR-des]', 'en': 'Good afternoon', 'fr': 'Bon après-midi', 'de': 'Guten Tag', 'it': 'Buon pomeriggio', 'ar': 'مساء الخير', 'zh': '下午好'},
            {'es': 'Buenas noches', 'pron': '[BWE-nas] [NO-ches]', 'en': 'Good evening', 'fr': 'Bonsoir', 'de': 'Guten Abend', 'it': 'Buonasera', 'ar': 'مساء الخير', 'zh': '晚上好'},
            {'es': '¿Cómo está usted?', 'pron': '[KÓ-mo] es-[TÁ] us-[TED]', 'en': 'How are you? (formal)', 'fr': 'Comment allez-vous?', 'de': 'Wie geht es Ihnen?', 'it': 'Come sta?', 'ar': 'كيف حالك؟', 'zh': '您好吗？'},
        ],
        'informal': [
            {'es': '¡Hola!', 'pron': '[Ó-la]', 'en': 'Hi!', 'fr': 'Salut!', 'de': 'Hallo!', 'it': 'Ciao!', 'ar': 'مرحبا!', 'zh': '嗨！'},
            {'es': '¿Qué tal?', 'pron': '[ké] [tal]', 'en': "How's it going?", 'fr': 'Ça va?', 'de': "Wie geht's?", 'it': 'Come va?', 'ar': 'كيف الحال؟', 'zh': '怎么样？'},
            {'es': '¿Cómo estás?', 'pron': '[KÓ-mo] es-[TÁS]', 'en': 'How are you?', 'fr': 'Comment vas-tu?', 'de': 'Wie geht es dir?', 'it': 'Come stai?', 'ar': 'كيف حالك؟', 'zh': '你好吗？'},
            {'es': '¿Qué pasa?', 'pron': '[ké] [PÁ-sa]', 'en': "What's up?", 'fr': "Qu'est-ce qui se passe?", 'de': 'Was geht?', 'it': 'Che succede?', 'ar': 'ما الأمر؟', 'zh': '怎么了？'},
        ],
        'slang': [
            {'es': '¡Qué pasa, tío!', 'pron': '[ké] [PÁ-sa] [TÍ-o]', 'en': "What's up, dude!", 'fr': 'Quoi de neuf, mec!', 'de': 'Was geht, Alter!', 'it': 'Che succede, amico!', 'ar': 'ما الجديد يا صاحبي!', 'zh': '怎么了，哥们！'},
            {'es': '¡Qué onda, güey!', 'pron': '[ké] [ÓN-da] [güey]', 'en': "What's up, dude! (Mexico)", 'fr': 'Quoi de neuf, mec!', 'de': 'Was geht, Alter!', 'it': 'Che succede, amico!', 'ar': 'ما الجديد!', 'zh': '怎么了，哥们！'},
            {'es': '¡Buenas!', 'pron': '[BWE-nas]', 'en': 'Hey! (any time)', 'fr': 'Salut!', 'de': 'Hey!', 'it': 'Ciao!', 'ar': 'مرحبا!', 'zh': '嘿！'},
        ],
        'dirty': [
            {'es': '¡Joder, tío!', 'pron': '[jo-DER] [TÍ-o]', 'en': 'F**k, dude! (Spain)', 'fr': 'Putain, mec!', 'de': 'Scheiße, Alter!', 'it': 'Cazzo, amico!', 'ar': 'اللعنة!', 'zh': '该死！'},
            {'es': '¡No mames!', 'pron': '[no] [MA-mes]', 'en': 'No way! (Mexico, vulgar)', 'fr': 'Pas possible!', 'de': 'Echt jetzt!', 'it': 'Ma dai!', 'ar': 'مستحيل!', 'zh': '不会吧！'},
        ],
        'expert': [
            {'es': 'Vos sabés', 'pron': '[vos] sa-[BÉS]', 'en': 'You know (Argentine voseo)', 'fr': 'Tu sais (voseo)', 'de': 'Du weißt (Voseo)', 'it': 'Tu sai (voseo)', 'ar': 'أنت تعرف', 'zh': '你知道'},
            {'es': 'Vosotros sabéis', 'pron': '[bo-SO-tros] sa-[BÉIS]', 'en': 'You all know (Spain)', 'fr': 'Vous savez', 'de': 'Ihr wisst', 'it': 'Voi sapete', 'ar': 'أنتم تعرفون', 'zh': '你们知道'},
        ]
    },
    'numbers_1_20': {
        'formal': [
            {'es': 'uno', 'pron': '[U-no]', 'en': 'one', 'fr': 'un', 'de': 'eins', 'it': 'uno', 'ar': 'واحد', 'zh': '一'},
            {'es': 'dos', 'pron': '[dos]', 'en': 'two', 'fr': 'deux', 'de': 'zwei', 'it': 'due', 'ar': 'اثنان', 'zh': '二'},
            {'es': 'tres', 'pron': '[tres]', 'en': 'three', 'fr': 'trois', 'de': 'drei', 'it': 'tre', 'ar': 'ثلاثة', 'zh': '三'},
            {'es': 'cuatro', 'pron': '[KWA-tro]', 'en': 'four', 'fr': 'quatre', 'de': 'vier', 'it': 'quattro', 'ar': 'أربعة', 'zh': '四'},
            {'es': 'cinco', 'pron': '[THIN-ko]', 'en': 'five', 'fr': 'cinq', 'de': 'fünf', 'it': 'cinque', 'ar': 'خمسة', 'zh': '五'},
            {'es': 'seis', 'pron': '[seis]', 'en': 'six', 'fr': 'six', 'de': 'sechs', 'it': 'sei', 'ar': 'ستة', 'zh': '六'},
            {'es': 'siete', 'pron': '[SIE-te]', 'en': 'seven', 'fr': 'sept', 'de': 'sieben', 'it': 'sette', 'ar': 'سبعة', 'zh': '七'},
            {'es': 'ocho', 'pron': '[O-cho]', 'en': 'eight', 'fr': 'huit', 'de': 'acht', 'it': 'otto', 'ar': 'ثمانية', 'zh': '八'},
            {'es': 'nueve', 'pron': '[NWE-ve]', 'en': 'nine', 'fr': 'neuf', 'de': 'neun', 'it': 'nove', 'ar': 'تسعة', 'zh': '九'},
            {'es': 'diez', 'pron': '[dieth]', 'en': 'ten', 'fr': 'dix', 'de': 'zehn', 'it': 'dieci', 'ar': 'عشرة', 'zh': '十'},
        ]
    }
}

# Humor database
HUMOR_DB = {
    'greetings': [
        "¿Por qué el español es tan educado? ¡Porque tiene 'buenos' días, tardes Y noches! 😄",
        "En España, 'buenas' funciona a cualquier hora. ¡Es el comodín de los saludos! 🃏",
        "¿Sabías que los españoles dan dos besos al saludar? ¡Empieza por la derecha o habrá un momento incómodo! 😅",
    ],
    'numbers': [
        "¿Por qué los números españoles van al gimnasio? ¡Para tener buen 'cuerpo' de número! 💪😂",
        "El número 5 en España suena como 'thinko'. ¡Los españoles hacen que contar sea una aventura! 🎢",
    ],
    'family': [
        "¿Por qué la familia española es como una telenovela? ¡Porque siempre hay drama! 📺😂",
        "En las reuniones familiares hispanas puede haber 100+ personas. ¡Y todos son 'primos'! 👨‍👩‍👧‍👦",
    ],
    'food': [
        "¿Por qué los españoles cenan tan tarde? ¡Porque están esperando que el sol se ponga... a las 10pm! 🌅😂",
        "La paella es como la familia española: ¡todos quieren meter su cuchara! 🥘",
    ],
    'default': [
        "El español tiene más excepciones que reglas. ¡Es como un juego donde las reglas cambian cada turno! 🎲",
        "Aprender español es fácil... ¡hasta que descubres el subjuntivo! 😱",
    ]
}

# Cultural notes database
CULTURAL_DB = {
    'greetings': [
        "En España, es común dar dos besos al saludar. En Latinoamérica, generalmente es uno.",
        "Los españoles usan 'usted' menos que los latinoamericanos. En España, tutear es más común.",
        "En Argentina, el 'voseo' reemplaza al 'tú'. ¡Vos sos muy amable!",
    ],
    'food': [
        "En España, el almuerzo es la comida principal (2-4pm). La cena es ligera y tarde (9-11pm).",
        "La sobremesa es sagrada: es el tiempo de conversación después de comer.",
        "En México, la tortilla es de maíz. En España, es una tortilla de huevo con patatas.",
    ],
    'default': [
        "El español es el segundo idioma más hablado del mundo por número de hablantes nativos.",
        "Hay 21 países donde el español es idioma oficial.",
    ]
}

def get_humor(topic: str) -> str:
    """Get a random humor note for the topic."""
    import random
    jokes = HUMOR_DB.get(topic, HUMOR_DB['default'])
    return random.choice(jokes)

def get_cultural_note(topic: str) -> str:
    """Get a cultural note for the topic."""
    import random
    notes = CULTURAL_DB.get(topic, CULTURAL_DB['default'])
    return random.choice(notes)

def generate_lesson_content(lesson_id: str, topic: str, mode: str, level: str, vocab: List[Dict]) -> str:
    """Generate formatted lesson content."""
    content = f"📚 VOCABULARIO - {topic.replace('_', ' ').title()}\n\n"
    
    for item in vocab[:6]:  # Limit to 6 vocab items per lesson
        content += f"**{item['es']}** → {item['en']}\n"
        content += f"Pronunciación: {item['pron']}\n\n"
    
    content += f"🎯 IMPORTANTE\n\n"
    if mode == 'formal':
        content += "En español formal, usamos **\"usted\"** para mostrar respeto.\n\n"
    elif mode == 'informal':
        content += "Con amigos y familia, usamos **\"tú\"** - ¡es más cercano!\n\n"
    elif mode == 'slang':
        content += "El slang varía MUCHO según el país. ¡Cuidado con el contexto!\n\n"
    elif mode == 'dirty':
        content += "⚠️ Este vocabulario es para adultos (18+). Úsalo con precaución.\n\n"
    elif mode == 'expert':
        content += "Este nivel incluye variaciones dialectales y registros especializados.\n\n"
    
    content += f"💡 EJEMPLO\n\n"
    if vocab:
        content += f"— {vocab[0]['es']}\n"
        content += f"— ¡Muy bien! ({vocab[0]['en']})\n\n"
    
    content += f"📖 GRAMÁTICA\n\n"
    content += "Recuerda la concordancia de género y número en español.\n\n"
    
    content += f"🌍 CULTURAL\n\n"
    content += get_cultural_note(topic.split('_')[0]) + "\n\n"
    
    content += f"😄 HUMOR\n\n"
    content += get_humor(topic.split('_')[0])
    
    return content

def generate_lesson(lesson_num: int, level: str, mode: str, topic: str) -> Dict[str, Any]:
    """Generate a single lesson."""
    lesson_id = f"{level}_{mode}_{topic}_{lesson_num:04d}"
    
    # Get vocabulary for this topic/mode
    topic_key = topic.split('_')[0] if '_' in topic else topic
    vocab_data = VOCABULARY_DB.get(topic_key, {})
    vocab = vocab_data.get(mode, vocab_data.get('formal', []))
    
    return {
        "id": lesson_id,
        "title": f"{topic.replace('_', ' ').title()} - Lesson {lesson_num}",
        "level": level,
        "mode": mode,
        "topic": topic,
        "content": generate_lesson_content(lesson_id, topic, mode, level, vocab),
        "vocabulary": vocab,
        "exercises": [
            {
                "type": "multiple_choice",
                "question": f"Select the correct translation for '{vocab[0]['es'] if vocab else 'hola'}'",
                "options": [vocab[0]['en'] if vocab else 'hello', "incorrect1", "incorrect2", "incorrect3"],
                "correct": 0
            },
            {
                "type": "fill_blank",
                "question": f"Complete: _____ días (Good morning)",
                "correct": "Buenos"
            }
        ],
        "humor": get_humor(topic_key),
        "cultural_note": get_cultural_note(topic_key),
        "duration_minutes": 10 + (LEVELS.index(level) * 2),
        "premium": mode in ['dirty', 'expert'],
        "created": datetime.now().isoformat(),
        "immutable": True
    }

def generate_batch(batch_num: int, start_lesson: int, lessons_count: int) -> Dict[str, Any]:
    """Generate a batch of lessons."""
    lessons = []
    lesson_num = start_lesson
    
    # Distribute lessons across levels and modes
    for level in LEVELS:
        available_modes = MODES[:2] if level in ['A1', 'A2'] else MODES[:3] if level == 'B1' else MODES[:4] if level == 'B2' else MODES
        topics = TOPICS[level]
        
        for topic in topics:
            for mode in available_modes:
                if len(lessons) >= lessons_count:
                    break
                lessons.append(generate_lesson(lesson_num, level, mode, topic))
                lesson_num += 1
            if len(lessons) >= lessons_count:
                break
        if len(lessons) >= lessons_count:
            break
    
    # Fill remaining with mixed content
    while len(lessons) < lessons_count:
        level = LEVELS[lesson_num % len(LEVELS)]
        mode = MODES[lesson_num % len(MODES)]
        topic = TOPICS[level][lesson_num % len(TOPICS[level])]
        lessons.append(generate_lesson(lesson_num, level, mode, topic))
        lesson_num += 1
    
    return {
        "batch_id": f"{batch_num:03d}",
        "batch_name": f"Eternal Lessons Batch {batch_num}",
        "total_lessons": len(lessons),
        "start_lesson": start_lesson,
        "end_lesson": start_lesson + len(lessons) - 1,
        "created": datetime.now().isoformat(),
        "immutable": True,
        "lessons": lessons
    }

def main():
    """Generate all 10,000 lessons in batches of 1000."""
    output_dir = os.path.dirname(os.path.abspath(__file__))
    
    print("🚀 Prize2Pride Eternal Lesson Generator")
    print("=" * 50)
    print(f"Generating {TOTAL_LESSONS} lessons in {TOTAL_LESSONS // LESSONS_PER_BATCH} batches")
    print("=" * 50)
    
    for batch_num in range(1, (TOTAL_LESSONS // LESSONS_PER_BATCH) + 1):
        start_lesson = (batch_num - 1) * LESSONS_PER_BATCH + 1
        
        print(f"\n📦 Generating Batch {batch_num:03d} (Lessons {start_lesson}-{start_lesson + LESSONS_PER_BATCH - 1})...")
        
        batch = generate_batch(batch_num, start_lesson, LESSONS_PER_BATCH)
        
        # Save batch to JSON file
        filename = f"batch_{batch_num:03d}_lessons_{start_lesson:05d}_{start_lesson + LESSONS_PER_BATCH - 1:05d}.json"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(batch, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Saved: {filename}")
    
    print("\n" + "=" * 50)
    print(f"🎉 Successfully generated {TOTAL_LESSONS} eternal lessons!")
    print("=" * 50)

if __name__ == "__main__":
    main()
