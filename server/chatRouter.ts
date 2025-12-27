import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import { llm } from "./_core/llm";

// Define the schema for the chat input
const chatInputSchema = z.object({
  message: z.string().min(1),
  language: z.string().default('en'),
  cefrLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).default('A1'),
});

// Define the schema for the chat response
const chatResponseSchema = z.object({
  response: z.string(),
  // In a real implementation, this would include avatar animation/lip-sync data
  // For now, we'll just return the text response
});

export const chatRouter = router({
  // Procedure for real-time chat with the autonomous avatar
  interact: publicProcedure
    .input(chatInputSchema)
    .output(chatResponseSchema)
    .mutation(async ({ input }) => {
      const { message, language, cefrLevel } = input;

      // --- AGI Logic for Autonomous Spanish Teaching ---
      // 1. Define the persona for the LLM
      const systemPrompt = `You are "Prize2Pride Host," an ultra-luxurious, charismatic, and highly knowledgeable Spanish language instructor.
      Your goal is to engage the user in a conversation in Spanish, tailored to the CEFR level: ${cefrLevel}.
      The user's native language is ${language}.
      You must maintain the persona of a host in a high-stakes, knowledge-casino environment.
      Your responses must be primarily in Spanish, but you can use the user's native language for brief explanations or encouragement.
      The conversation should be about a topic relevant to the CEFR level, such as:
      - A1: Greetings, basic introductions, ordering food.
      - A2: Daily routines, past experiences, simple future plans.
      - B1: Expressing opinions, dealing with common travel situations, describing dreams.
      - B2: Discussing complex social issues, debating, advanced narrative.
      - C1: Nuanced expression, professional contexts, abstract concepts.
      - C2: Native-like mastery, literary analysis, philosophical discourse, cultural subtleties, humor, and any specialized domain.

      The user's message is: "${message}"`;

      // 2. Call the LLM (using the pre-configured OpenAI client)
      const llmResponse = await llm.chat.completions.create({
        model: "gpt-4.1-mini", // Using a fast, capable model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      });

      const responseText = llmResponse.choices[0].message.content || "Lo siento, no pude procesar tu solicitud.";

      // 3. Return the response
      return {
        response: responseText,
      };
    }),
});
