/**
 * Prize2Pride Lingua Spanish Platform
 * Lesson Content Generator with Multi-colored Formatting
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * Generates beautifully formatted Spanish lessons with:
 * - Multi-colored text based on content type
 * - Bold important words
 * - Stressed syllables highlighted
 * - Line breaks after expressions
 * - Optimal spacing for comfortable reading
 */

export interface GeneratedLesson {
  id: string;
  title: string;
  level: string;
  mode: string;
  topic: string;
  content: string;
  vocabulary: VocabularyItem[];
  grammar: GrammarPoint[];
  exercises: Exercise[];
  culturalNotes: string[];
}

export interface VocabularyItem {
  spanish: string;
  pronunciation: string;
  translations: {
    en: string;
    fr: string;
    de: string;
    it: string;
    ar: string;
    zh: string;
  };
  example: string;
  context: string;
}

export interface GrammarPoint {
  title: string;
  explanation: string;
  examples: string[];
  exceptions?: string[];
}

export interface Exercise {
  type: 'multiple_choice' | 'fill_blank' | 'translation' | 'pronunciation' | 'conversation';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

// Vocabulary database by topic and mode
const VOCABULARY_DATABASE: Record<string, Record<string, VocabularyItem[]>> = {
  greetings: {
    formal: [
      {
        spanish: 'Buenos días',
        pronunciation: '[BWE-nos] [DÍ-as]',
        translations: {
          en: 'Good morning',
          fr: 'Bonjour',
          de: 'Guten Morgen',
          it: 'Buongiorno',
          ar: 'صباح الخير',
          zh: '早上好'
        },
        example: 'Buenos días, señor García. ¿Cómo está usted?',
        context: 'Formal morning greeting, used until noon'
      },
      {
        spanish: 'Buenas tardes',
        pronunciation: '[BWE-nas] [TAR-des]',
        translations: {
          en: 'Good afternoon',
          fr: 'Bon après-midi',
          de: 'Guten Tag',
          it: 'Buon pomeriggio',
          ar: 'مساء الخير',
          zh: '下午好'
        },
        example: 'Buenas tardes, ¿en qué puedo ayudarle?',
        context: 'Formal afternoon greeting, used from noon to evening'
      },
      {
        spanish: 'Encantado/a de conocerle',
        pronunciation: '[en-kan-TA-do] [de] [ko-no-SER-le]',
        translations: {
          en: 'Pleased to meet you',
          fr: 'Enchanté(e) de vous connaître',
          de: 'Freut mich, Sie kennenzulernen',
          it: 'Piacere di conoscerla',
          ar: 'سعيد بلقائك',
          zh: '很高兴认识您'
        },
        example: 'Encantado de conocerle, señora Martínez.',
        context: 'Formal introduction phrase'
      }
    ],
    informal: [
      {
        spanish: '¡Hola!',
        pronunciation: '[Ó-la]',
        translations: {
          en: 'Hi!',
          fr: 'Salut !',
          de: 'Hallo!',
          it: 'Ciao!',
          ar: 'مرحبا!',
          zh: '嗨！'
        },
        example: '¡Hola! ¿Qué tal?',
        context: 'Universal informal greeting'
      },
      {
        spanish: '¿Qué tal?',
        pronunciation: '[ké] [tal]',
        translations: {
          en: "How's it going?",
          fr: 'Ça va ?',
          de: "Wie geht's?",
          it: 'Come va?',
          ar: 'كيف الحال؟',
          zh: '怎么样？'
        },
        example: '¡Hola, María! ¿Qué tal?',
        context: 'Casual inquiry about well-being'
      },
      {
        spanish: '¿Qué pasa?',
        pronunciation: '[ké] [PÁ-sa]',
        translations: {
          en: "What's up?",
          fr: "Qu'est-ce qui se passe ?",
          de: 'Was geht ab?',
          it: 'Che succede?',
          ar: 'ما الأمر؟',
          zh: '怎么了？'
        },
        example: '¡Ey! ¿Qué pasa, tío?',
        context: 'Very casual greeting among friends'
      }
    ],
    slang: [
      {
        spanish: '¡Qué pasa, tío!',
        pronunciation: '[ké] [PÁ-sa] [TÍ-o]',
        translations: {
          en: "What's up, dude!",
          fr: 'Quoi de neuf, mec !',
          de: 'Was geht, Alter!',
          it: 'Che succede, amico!',
          ar: 'ما الجديد يا صاحبي!',
          zh: '怎么了，哥们！'
        },
        example: '¡Qué pasa, tío! ¿Cómo va el finde?',
        context: 'Spain - very casual greeting among friends'
      },
      {
        spanish: '¡Qué onda, güey!',
        pronunciation: '[ké] [ÓN-da] [güey]',
        translations: {
          en: "What's up, dude!",
          fr: 'Quoi de neuf, mec !',
          de: 'Was geht, Alter!',
          it: 'Che succede, amico!',
          ar: 'ما الجديد يا صاحبي!',
          zh: '怎么了，哥们！'
        },
        example: '¡Qué onda, güey! ¿Qué haces?',
        context: 'Mexico - casual greeting among friends'
      },
      {
        spanish: '¡Che, qué hacés!',
        pronunciation: '[che] [ké] a-[SÉS]',
        translations: {
          en: 'Hey, what are you doing!',
          fr: 'Hé, tu fais quoi !',
          de: 'Hey, was machst du!',
          it: 'Ehi, che fai!',
          ar: 'هيه، ماذا تفعل!',
          zh: '嘿，你在干嘛！'
        },
        example: '¡Che, qué hacés! ¿Todo bien?',
        context: 'Argentina - casual greeting with voseo'
      }
    ],
    dirty: [
      {
        spanish: '¡Joder, tío!',
        pronunciation: '[jo-DER] [TÍ-o]',
        translations: {
          en: 'F**k, dude!',
          fr: 'Putain, mec !',
          de: 'Scheiße, Alter!',
          it: 'Cazzo, amico!',
          ar: 'اللعنة يا صاحبي!',
          zh: '该死，哥们！'
        },
        example: '¡Joder, tío! ¡Cuánto tiempo sin verte!',
        context: 'Spain - strong exclamation, can be friendly'
      },
      {
        spanish: '¡No mames, güey!',
        pronunciation: '[no] [MA-mes] [güey]',
        translations: {
          en: 'No way, dude!',
          fr: 'Pas possible, mec !',
          de: 'Echt jetzt, Alter!',
          it: 'Ma dai, amico!',
          ar: 'مستحيل يا صاحبي!',
          zh: '不会吧，哥们！'
        },
        example: '¡No mames! ¿En serio te casas?',
        context: 'Mexico - expression of disbelief (vulgar)'
      }
    ],
    expert: [
      {
        spanish: 'Vos sabés',
        pronunciation: '[vos] sa-[BÉS]',
        translations: {
          en: 'You know (Argentine voseo)',
          fr: 'Tu sais (voseo argentin)',
          de: 'Du weißt (argentinisches Voseo)',
          it: 'Tu sai (voseo argentino)',
          ar: 'أنت تعرف (الفوسيو الأرجنتيني)',
          zh: '你知道（阿根廷voseo）'
        },
        example: 'Vos sabés que te quiero mucho.',
        context: 'Rioplatense Spanish - voseo conjugation'
      },
      {
        spanish: 'Vosotros sabéis',
        pronunciation: '[bo-SO-tros] sa-[BÉIS]',
        translations: {
          en: 'You all know (Spain)',
          fr: 'Vous savez (Espagne)',
          de: 'Ihr wisst (Spanien)',
          it: 'Voi sapete (Spagna)',
          ar: 'أنتم تعرفون (إسبانيا)',
          zh: '你们知道（西班牙）'
        },
        example: 'Vosotros sabéis la verdad.',
        context: 'Peninsular Spanish - vosotros form (Spain only)'
      }
    ]
  }
};

// Generate formatted lesson content
export function generateLessonContent(
  topic: string,
  mode: string,
  level: string,
  userLanguage: string = 'en'
): string {
  const vocabulary = VOCABULARY_DATABASE[topic]?.[mode] || VOCABULARY_DATABASE.greetings.formal;
  
  let content = '';
  
  // Header
  content += `📚 VOCABULARIO - ${topic.charAt(0).toUpperCase() + topic.slice(1)} (${mode.charAt(0).toUpperCase() + mode.slice(1)})\n\n`;
  
  // Vocabulary items
  vocabulary.forEach((item, index) => {
    content += `**${item.spanish}** → ${item.translations[userLanguage as keyof typeof item.translations] || item.translations.en}\n`;
    content += `Pronunciación: ${item.pronunciation}\n\n`;
    
    if (index === 0) {
      content += `💡 EJEMPLO\n\n`;
      content += `— ${item.example}\n\n`;
    }
  });
  
  // Important note
  content += `🎯 IMPORTANTE\n\n`;
  
  if (mode === 'formal') {
    content += `En español formal, usamos **"usted"** en lugar de "tú".\n\n`;
    content += `**¿Cómo está usted?** → How are you? (formal)\n`;
    content += `Pronunciación: [KÓ-mo] es-[TÁ] us-[TED]\n\n`;
  } else if (mode === 'informal') {
    content += `Con amigos y familia, usamos **"tú"** - ¡es más cercano!\n\n`;
    content += `**¿Cómo estás?** → How are you? (informal)\n`;
    content += `Pronunciación: [KÓ-mo] es-[TÁS]\n\n`;
  } else if (mode === 'slang') {
    content += `El slang varía MUCHO según el país:\n\n`;
    content += `• **España**: tío, tía, mola, guay\n`;
    content += `• **México**: güey, chido, padre\n`;
    content += `• **Argentina**: che, boludo, copado\n\n`;
  } else if (mode === 'dirty') {
    content += `⚠️ **ADVERTENCIA**: Este vocabulario es para adultos (18+)\n\n`;
    content += `Algunas palabras pueden ser ofensivas dependiendo del contexto.\n`;
    content += `Úsalas con precaución y solo con personas de confianza.\n\n`;
  } else if (mode === 'expert') {
    content += `El español tiene más de 20 variedades nacionales.\n\n`;
    content += `• **Voseo**: Argentina, Uruguay, partes de Centroamérica\n`;
    content += `• **Vosotros**: Solo en España peninsular\n`;
    content += `• **Ustedes**: Latinoamérica (formal e informal)\n\n`;
  }
  
  // Grammar section
  content += `📖 GRAMÁTICA\n\n`;
  
  if (mode === 'formal') {
    content += `El verbo **"estar"** se conjuga así con usted:\n`;
    content += `**Usted está** → You are (formal)\n\n`;
  } else if (mode === 'informal') {
    content += `El verbo **"estar"** con tú:\n`;
    content += `**Tú estás** → You are (informal)\n\n`;
  } else if (mode === 'expert') {
    content += `Conjugación del voseo (Argentina):\n`;
    content += `**Vos estás** / **Vos sos** → You are\n`;
    content += `**Vos tenés** → You have\n`;
    content += `**Vos querés** → You want\n\n`;
  }
  
  // Cultural note
  content += `🌍 CULTURAL\n\n`;
  
  if (mode === 'formal') {
    content += `En España y Latinoamérica, es importante usar el tratamiento formal con:\n`;
    content += `• Personas mayores\n`;
    content += `• En contextos profesionales\n`;
    content += `• Con desconocidos\n`;
  } else if (mode === 'informal') {
    content += `En España, es común dar dos besos al saludar.\n`;
    content += `En Latinoamérica, generalmente es un beso o un abrazo.\n`;
  } else if (mode === 'slang') {
    content += `⚠️ Cuidado: algunas palabras son ofensivas en ciertos países.\n`;
    content += `**"Coger"** significa "tomar" en España, pero es vulgar en Latinoamérica.\n`;
  }
  
  return content;
}

// Generate a complete lesson object
export function generateLesson(
  topic: string,
  mode: string,
  level: string,
  lessonNumber: number
): GeneratedLesson {
  const vocabulary = VOCABULARY_DATABASE[topic]?.[mode] || VOCABULARY_DATABASE.greetings.formal;
  
  return {
    id: `${level}_${mode}_${topic}_${lessonNumber}`,
    title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} - ${mode.charAt(0).toUpperCase() + mode.slice(1)} (${level})`,
    level,
    mode,
    topic,
    content: generateLessonContent(topic, mode, level),
    vocabulary,
    grammar: [
      {
        title: 'Verb Conjugation',
        explanation: `Learn how to conjugate verbs in ${mode} Spanish`,
        examples: vocabulary.map(v => v.example)
      }
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: `How do you say "${vocabulary[0]?.translations.en}" in Spanish?`,
        options: [vocabulary[0]?.spanish, 'Incorrect option 1', 'Incorrect option 2', 'Incorrect option 3'],
        correctAnswer: vocabulary[0]?.spanish || '',
        explanation: `"${vocabulary[0]?.spanish}" means "${vocabulary[0]?.translations.en}" in ${mode} Spanish.`
      },
      {
        type: 'pronunciation',
        question: `Practice the pronunciation: ${vocabulary[0]?.spanish}`,
        correctAnswer: vocabulary[0]?.pronunciation || '',
        explanation: `The stressed syllables are marked in brackets: ${vocabulary[0]?.pronunciation}`
      }
    ],
    culturalNotes: [
      `In ${mode} Spanish, greetings vary by region and context.`,
      `Always consider the relationship with the person you're speaking to.`
    ]
  };
}

// Generate AI tutor response with formatted content
export function generateTutorResponse(
  userInput: string,
  mode: string,
  level: string,
  userLanguage: string = 'en'
): string {
  const input = userInput.toLowerCase();
  
  // Greeting responses
  if (input.includes('hola') || input.includes('hello') || input.includes('hi')) {
    return `
¡Excelente! Has dicho **"${userInput}"** 🎉

📚 RESPUESTAS POSIBLES

**Formal:**
— Hola, ¿cómo está usted?
— Buenos días, encantado de conocerle.

**Informal:**
— ¡Hola! ¿Qué tal?
— ¡Hey! ¿Cómo estás?

💡 PRÁCTICA

Intenta responder a este saludo:
"¡Hola! ¿Cómo te llamas?"

🎯 RECUERDA

En español, **"¡"** y **"¿"** van al principio de exclamaciones y preguntas.
`;
  }
  
  // Thank you responses
  if (input.includes('gracias') || input.includes('thank')) {
    return `
¡Muy bien! **"Gracias"** es una palabra muy importante 👏

📚 FORMAS DE DAR LAS GRACIAS

**Gracias** → Thanks
Pronunciación: [GRA-sias]

**Muchas gracias** → Thank you very much
Pronunciación: [MU-chas] [GRA-sias]

**Muchísimas gracias** → Thank you so much
Pronunciación: [mu-CHÍ-si-mas] [GRA-sias]

💡 RESPUESTAS A "GRACIAS"

**De nada** → You're welcome
**No hay de qué** → Don't mention it
**A ti** → Thank you (returning thanks)

🌍 CULTURAL

En España también se dice **"¡De buen rollo!"** (informal)
En México: **"¡No hay bronca!"**
`;
  }
  
  // Default response with lesson content
  return `
¡Interesante! 🤔

Veo que has escrito: **"${userInput}"**

📚 CONTINUEMOS CON LA LECCIÓN

Aquí tienes más vocabulario útil:

**Por favor** → Please
Pronunciación: [por] fa-[VOR]

**Perdón** → Sorry / Excuse me
Pronunciación: [per-DÓN]

**Lo siento** → I'm sorry
Pronunciación: [lo] [SIEN-to]

💡 EJEMPLO EN CONTEXTO

— Perdón, ¿puede repetir?
— Sí, claro. Buenos días.
— Muchas gracias.
— De nada.

🎯 EJERCICIO

Intenta formar una oración usando **"por favor"** y **"gracias"**.
`;
}

export default {
  generateLessonContent,
  generateLesson,
  generateTutorResponse,
  VOCABULARY_DATABASE
};
