// src/ai/flows/suggest-relevant-attractions.ts
'use server';

/**
 * @fileOverview Personalized travel recommendations flow for relevant attractions.
 *
 * This file defines a Genkit flow that provides personalized suggestions
 * for eco-tourism and cultural experiences based on user data, specifically for relevant attractions.
 *
 * @exports suggestRelevantAttractions - The main function to trigger the flow.
 * @exports SuggestRelevantAttractionsInput - The input type for the flow.
 * @exports SuggestRelevantAttractionsOutput - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for personalized recommendations
const SuggestRelevantAttractionsInputSchema = z.object({
  travelScore: z.number().describe('The user travel score.'),
  pastBookings: z.string().describe('A list of the user past bookings.'),
  interests: z.string().describe('The user interests.'),
  location: z.string().describe('The current location of the user.'),
});

export type SuggestRelevantAttractionsInput = z.infer<typeof SuggestRelevantAttractionsInputSchema>;

// Output schema for personalized recommendations
const SuggestRelevantAttractionsOutputSchema = z.object({
  recommendations: z.string().describe('A list of personalized travel recommendations for relevant attractions near the user location.'),
});

export type SuggestRelevantAttractionsOutput = z.infer<typeof SuggestRelevantAttractionsOutputSchema>;

// Main function to receive personalized recommendations
export async function suggestRelevantAttractions(
  input: SuggestRelevantAttractionsInput
): Promise<SuggestRelevantAttractionsOutput> {
  return suggestRelevantAttractionsFlow(input);
}

// Define the prompt for personalized recommendations
const suggestRelevantAttractionsPrompt = ai.definePrompt({
  name: 'suggestRelevantAttractionsPrompt',
  input: {schema: SuggestRelevantAttractionsInputSchema},
  output: {schema: SuggestRelevantAttractionsOutputSchema},
  prompt: `You are a travel expert providing personalized travel recommendations for eco-tourism and cultural experiences based on the user\'s travel score, past bookings, interests, and current location. Only suggest places in Jharkhand.

  Travel Score: {{{travelScore}}}
  Past Bookings: {{{pastBookings}}}
  Interests: {{{interests}}}
  Current Location: {{{location}}}

  Provide a list of personalized eco-tourism and cultural experiences that align with the user\'s interests and values, and that are relevant to the user\'s current location. Focus on attractions near the user. List the attractions with a short description.
  Format the recommendations as a list.
`,
});

// Define the Genkit flow for personalized recommendations
const suggestRelevantAttractionsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantAttractionsFlow',
    inputSchema: SuggestRelevantAttractionsInputSchema,
    outputSchema: SuggestRelevantAttractionsOutputSchema,
  },
  async input => {
    const {output} = await suggestRelevantAttractionsPrompt(input);
    return output!;
  }
);
