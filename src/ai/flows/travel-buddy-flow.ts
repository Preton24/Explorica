'use server';

/**
 * @fileOverview A friendly AI travel buddy for trip planning and real-time assistance.
 *
 * - chatWithTravelBuddy - A function that handles the chat conversation.
 * - ChatWithTravelBuddyInput - The input type for the chat function.
 * - ChatWithTravelBuddyOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithTravelBuddyInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
        text: z.string()
    })),
  })).describe('The history of the conversation.'),
  message: z.string().describe('The latest message from the user.'),
});

export type ChatWithTravelBuddyInput = z.infer<typeof ChatWithTravelBuddyInputSchema>;

const ChatWithTravelBuddyOutputSchema = z.object({
  response: z.string().describe('The AI\'s response to the user.'),
});

export type ChatWithTravelBuddyOutput = z.infer<typeof ChatWithTravelBuddyOutputSchema>;

export async function chatWithTravelBuddy(
  input: ChatWithTravelBuddyInput
): Promise<ChatWithTravelBuddyOutput> {
  return chatWithTravelBuddyFlow(input);
}

const travelBuddyPrompt = ai.definePrompt({
  name: 'travelBuddyPrompt',
  input: {schema: ChatWithTravelBuddyInputSchema},
  output: {schema: ChatWithTravelBuddyOutputSchema},
  prompt: `You are "Travel Buddy AI", a friendly and knowledgeable assistant for tourists visiting Jharkhand, India, using the Explorica app. Your goal is to be helpful, concise, and provide a conversational experience.

  Your capabilities include:
  1.  **Trip Planning Assistance:** Help users plan their trips by suggesting destinations, creating itineraries, and providing information on accommodations and transportation within Jharkhand.
  2.  **Answering FAQs:** Answer frequently asked questions about bookings, destinations, local customs, and using the Explorica app.
  3.  **Real-time Help:** Offer advice on transportation options, what to do in minor emergencies (e.g., losing an item, feeling unwell), and cultural etiquette.

  Here is the conversation history:
  {{#each history}}
    {{#if (eq role 'user')}}User: {{content.[0].text}}{{/if}}
    {{#if (eq role 'model')}}AI: {{content.[0].text}}{{/if}}
  {{/each}}

  New user message: {{{message}}}

  Based on the conversation, provide a helpful and friendly response. Be specific to Jharkhand when possible.
  `,
});

const chatWithTravelBuddyFlow = ai.defineFlow(
  {
    name: 'chatWithTravelBuddyFlow',
    inputSchema: ChatWithTravelBuddyInputSchema,
    outputSchema: ChatWithTravelBuddyOutputSchema,
  },
  async input => {
    const {output} = await travelBuddyPrompt(input);
    return {
      response: output!.response,
    };
  }
);
