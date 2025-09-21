'use server';

/**
 * @fileOverview Personalized travel recommendations flow.
 *
 * This file defines a Genkit flow that provides personalized suggestions
 * for eco-tourism and cultural experiences based on user data.
 *
 * @exports receivePersonalizedRecommendations - The main function to trigger the flow.
 * @exports PersonalizedRecommendationsInput - The input type for the flow.
 * @exports PersonalizedRecommendationsOutput - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for personalized recommendations
const PersonalizedRecommendationsInputSchema = z.object({
  travelScore: z.number().describe('The user travel score.'),
  pastBookings: z.string().describe('A list of the user past bookings.'),
  interests: z.string().describe('The user interests.'),
});

export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

// Output schema for personalized recommendations
const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.string().describe('A list of personalized travel recommendations.'),
});

export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

// Main function to receive personalized recommendations
export async function receivePersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return receivePersonalizedRecommendationsFlow(input);
}

// Define the prompt for personalized recommendations
const personalizedRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are a travel expert providing personalized travel recommendations based on the user's travel score, past bookings, and interests.

  Travel Score: {{{travelScore}}}
  Past Bookings: {{{pastBookings}}}
  Interests: {{{interests}}}

  Provide a list of personalized eco-tourism and cultural experiences that align with the user's interests and values.
  Format the recommendations as a list.`,
});

// Define the Genkit flow for personalized recommendations
const receivePersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'receivePersonalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedRecommendationsPrompt(input);
    return output!;
  }
);
