import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";

// Linguistic register enum
const registerSchema = z.enum(['slang', 'informal', 'neutral', 'formal', 'diplomatic']);
type LinguisticRegister = z.infer<typeof registerSchema>;

// Register descriptions for the LLM
const registerDescriptions: Record<LinguisticRegister, string> = {
  slang: 'Very casual street language with colloquialisms, youth expressions, and regional slang. Example: "¡Qué guay, tío!"',
  informal: 'Casual everyday speech used with friends and family. Example: "¡Hola! ¿Qué tal?"',
  neutral: 'Standard language suitable for most situations. Example: "Buenos días, ¿cómo está usted?"',
  formal: 'Professional and business language with proper grammar. Example: "Estimado señor, le escribo para..."',
  diplomatic: 'Highly formal, ceremonial language used in official contexts. Example: "Excelentísimo señor, tengo el honor de..."'
};

export const registerRouter = router({
  // Convert text between linguistic registers
  convert: publicProcedure
    .input(z.object({
      text: z.string().min(1).max(1000),
      fromRegister: registerSchema,
      toRegister: registerSchema,
    }))
    .output(z.object({
      originalText: z.string(),
      convertedText: z.string(),
      fromRegister: registerSchema,
      toRegister: registerSchema,
      explanation: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const { text, fromRegister, toRegister } = input;

      // If same register, return as-is
      if (fromRegister === toRegister) {
        return {
          originalText: text,
          convertedText: text,
          fromRegister,
          toRegister,
          explanation: 'No conversion needed - same register.',
        };
      }

      const systemPrompt = `You are an expert Spanish linguist specializing in linguistic registers and sociolinguistic variation. Your task is to convert Spanish text between different registers while preserving the core meaning.

Register Definitions:
- SLANG: ${registerDescriptions.slang}
- INFORMAL: ${registerDescriptions.informal}
- NEUTRAL: ${registerDescriptions.neutral}
- FORMAL: ${registerDescriptions.formal}
- DIPLOMATIC: ${registerDescriptions.diplomatic}

Guidelines:
1. Preserve the core meaning and intent of the original text
2. Adjust vocabulary, grammar, and expressions to match the target register
3. For SLANG: Use colloquialisms, contractions, youth expressions, regional variations
4. For INFORMAL: Use casual greetings, tú form, everyday expressions
5. For NEUTRAL: Use standard Spanish, polite but not overly formal
6. For FORMAL: Use usted form, professional vocabulary, complete sentences
7. For DIPLOMATIC: Use honorifics, elaborate courtesy phrases, ceremonial language

Respond with ONLY the converted text, nothing else.`;

      const userPrompt = `Convert the following Spanish text from ${fromRegister.toUpperCase()} register to ${toRegister.toUpperCase()} register:

"${text}"`;

      try {
        const response = await invokeLLM({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          maxTokens: 500,
        });

        const convertedText = response.choices[0]?.message?.content?.toString().trim() || text;

        return {
          originalText: text,
          convertedText,
          fromRegister,
          toRegister,
          explanation: `Converted from ${fromRegister} to ${toRegister} register.`,
        };
      } catch (error) {
        console.error('Register conversion error:', error);
        // Return original text if conversion fails
        return {
          originalText: text,
          convertedText: text,
          fromRegister,
          toRegister,
          explanation: 'Conversion failed, returning original text.',
        };
      }
    }),

  // Get register examples
  getExamples: publicProcedure
    .input(z.object({
      register: registerSchema,
    }))
    .output(z.object({
      register: registerSchema,
      description: z.string(),
      examples: z.array(z.object({
        phrase: z.string(),
        translation: z.string(),
        context: z.string(),
      })),
    }))
    .query(({ input }) => {
      const examples: Record<LinguisticRegister, Array<{ phrase: string; translation: string; context: string }>> = {
        slang: [
          { phrase: '¡Qué guay, tío!', translation: "That's cool, dude!", context: 'Expressing enthusiasm with friends' },
          { phrase: '¡Mola mucho!', translation: "That's awesome!", context: 'Spanish youth slang' },
          { phrase: '¡Estoy flipando!', translation: "I'm freaking out!", context: 'Expressing surprise' },
          { phrase: '¡Qué pasada!', translation: 'How amazing!', context: 'Showing excitement' },
        ],
        informal: [
          { phrase: '¡Hola! ¿Qué tal?', translation: 'Hi! How are you?', context: 'Casual greeting' },
          { phrase: '¿Quedamos luego?', translation: 'Shall we meet up later?', context: 'Making plans with friends' },
          { phrase: 'Me parece bien', translation: 'Sounds good to me', context: 'Agreeing casually' },
          { phrase: '¡Nos vemos!', translation: 'See you!', context: 'Casual farewell' },
        ],
        neutral: [
          { phrase: 'Buenos días', translation: 'Good morning', context: 'Standard greeting' },
          { phrase: 'Me gustaría saber...', translation: 'I would like to know...', context: 'Polite inquiry' },
          { phrase: 'Gracias por su ayuda', translation: 'Thank you for your help', context: 'Expressing gratitude' },
          { phrase: 'Disculpe, ¿podría...?', translation: 'Excuse me, could you...?', context: 'Polite request' },
        ],
        formal: [
          { phrase: 'Estimado/a señor/a', translation: 'Dear Sir/Madam', context: 'Formal letter opening' },
          { phrase: 'Le agradecería que...', translation: 'I would appreciate if you...', context: 'Formal request' },
          { phrase: 'Atentamente', translation: 'Sincerely', context: 'Formal letter closing' },
          { phrase: 'Quedo a su disposición', translation: 'I remain at your disposal', context: 'Professional courtesy' },
        ],
        diplomatic: [
          { phrase: 'Excelentísimo/a señor/a', translation: 'Most Excellent Sir/Madam', context: 'Addressing dignitaries' },
          { phrase: 'Tengo el honor de...', translation: 'I have the honor to...', context: 'Ceremonial introduction' },
          { phrase: 'Con el debido respeto', translation: 'With due respect', context: 'Diplomatic disagreement' },
          { phrase: 'Me permito expresar...', translation: 'I take the liberty of expressing...', context: 'Formal opinion' },
        ],
      };

      return {
        register: input.register,
        description: registerDescriptions[input.register],
        examples: examples[input.register],
      };
    }),

  // Get all registers info
  getRegisters: publicProcedure
    .output(z.array(z.object({
      code: registerSchema,
      name: z.string(),
      description: z.string(),
      useCases: z.array(z.string()),
    })))
    .query(() => {
      return [
        {
          code: 'slang' as const,
          name: 'Slang / Street',
          description: registerDescriptions.slang,
          useCases: ['With close friends', 'Casual social media', 'Youth contexts', 'Informal texting'],
        },
        {
          code: 'informal' as const,
          name: 'Informal',
          description: registerDescriptions.informal,
          useCases: ['Family conversations', 'Friends', 'Casual workplace', 'Social gatherings'],
        },
        {
          code: 'neutral' as const,
          name: 'Neutral',
          description: registerDescriptions.neutral,
          useCases: ['Customer service', 'General public', 'News media', 'Education'],
        },
        {
          code: 'formal' as const,
          name: 'Formal',
          description: registerDescriptions.formal,
          useCases: ['Business emails', 'Job interviews', 'Official documents', 'Academic writing'],
        },
        {
          code: 'diplomatic' as const,
          name: 'Diplomatic',
          description: registerDescriptions.diplomatic,
          useCases: ['Government communications', 'Royal addresses', 'International relations', 'Ceremonial events'],
        },
      ];
    }),
});
