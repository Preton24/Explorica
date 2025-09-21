// src/ai/flows/get-personalized-sustainability-tips.ts
'use server';
/**
 * @fileOverview An AI agent for providing personalized sustainability tips based on user and trip details.
 *
 * - getPersonalizedSustainabilityTips - A function that generates personalized sustainability tips for a trip.
 * - GetPersonalizedSustainabilityTipsInput - The input type for the getPersonalizedSustainabilityTips function.
 * - GetPersonalizedSustainabilityTipsOutput - The return type for the getPersonalizedSustainabilityTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetPersonalizedSustainabilityTipsInputSchema = z.object({
  destination: z.string().describe('The destination of the trip.'),
  duration: z.string().describe('The duration of the trip in days.'),
  interests: z.string().describe('The interests of the traveler.'),
  travelScore: z.number().describe('The user travel score.'),
  pastBookings: z.string().describe('A list of the user past bookings.'),
  transportationPreference: z
    .string()
    .optional()
    .describe(
      'The preferred mode of transportation (e.g., train, bus, flight).'
    ),
  accommodationPreference: z
    .string()
    .optional()
    .describe('The preferred type of accommodation (e.g., homestay, hotel).'),
});
export type GetPersonalizedSustainabilityTipsInput = z.infer<
  typeof GetPersonalizedSustainabilityTipsInputSchema
>;

const GetPersonalizedSustainabilityTipsOutputSchema = z.object({
  sustainabilityTips: z
    .string()
    .describe('A list of personalized sustainability tips for the trip.'),
});
export type GetPersonalizedSustainabilityTipsOutput = z.infer<
  typeof GetPersonalizedSustainabilityTipsOutputSchema
>;

export async function getPersonalizedSustainabilityTips(
  input: GetPersonalizedSustainabilityTipsInput
): Promise<GetPersonalizedSustainabilityTipsOutput> {
  return getPersonalizedSustainabilityTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getPersonalizedSustainabilityTipsPrompt',
  input: {schema: GetPersonalizedSustainabilityTipsInputSchema},
  output: {schema: GetPersonalizedSustainabilityTipsOutputSchema},
  prompt: `You are a sustainability expert providing personalized tips for eco-friendly travel.

  Provide a list of specific, actionable sustainability tips for a trip to {{destination}} lasting {{duration}} days, considering the traveler's interests in {{interests}}, travel score of {{travelScore}} and past bookings: {{pastBookings}}.

  If the traveler has a transportation preference of {{transportationPreference}}, suggest eco-friendly alternatives.
  If the traveler has an accommodation preference of {{accommodationPreference}}, suggest sustainable options like local homestays over chain hotels to boost community income.
  Focus on tips that help minimize environmental impact and support the local community.
  `,
});

const getPersonalizedSustainabilityTipsFlow = ai.defineFlow(
  {
    name: 'getPersonalizedSustainabilityTipsFlow',
    inputSchema: GetPersonalizedSustainabilityTipsInputSchema,
    outputSchema: GetPersonalizedSustainabilityTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
