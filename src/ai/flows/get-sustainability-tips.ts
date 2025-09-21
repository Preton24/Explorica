// src/ai/flows/get-sustainability-tips.ts
'use server';
/**
 * @fileOverview An AI agent for providing sustainability tips.
 *
 * - getSustainabilityTips - A function that generates sustainability tips for a trip.
 * - GetSustainabilityTipsInput - The input type for the getSustainabilityTips function.
 * - GetSustainabilityTipsOutput - The return type for the getSustainabilityTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetSustainabilityTipsInputSchema = z.object({
  destination: z.string().describe('The destination of the trip.'),
  duration: z.string().describe('The duration of the trip in days.'),
  interests: z.string().describe('The interests of the traveler.'),
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
export type GetSustainabilityTipsInput = z.infer<
  typeof GetSustainabilityTipsInputSchema
>;

const GetSustainabilityTipsOutputSchema = z.object({
  sustainabilityTips: z
    .string()
    .describe('A list of sustainability tips for the trip.'),
});
export type GetSustainabilityTipsOutput = z.infer<
  typeof GetSustainabilityTipsOutputSchema
>;

export async function getSustainabilityTips(
  input: GetSustainabilityTipsInput
): Promise<GetSustainabilityTipsOutput> {
  return getSustainabilityTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getSustainabilityTipsPrompt',
  input: {schema: GetSustainabilityTipsInputSchema},
  output: {schema: GetSustainabilityTipsOutputSchema},
  prompt: `You are a sustainability expert providing tips for eco-friendly travel.

  Provide a list of specific, actionable sustainability tips for a trip to {{destination}} lasting {{duration}} days, considering the traveler's interests in {{interests}}.

  If the traveler has a transportation preference of {{transportationPreference}}, suggest eco-friendly alternatives.
  If the traveler has an accommodation preference of {{accommodationPreference}}, suggest sustainable options like local homestays over chain hotels to boost community income.
  Focus on tips that help minimize environmental impact and support the local community.
  `,
});

const getSustainabilityTipsFlow = ai.defineFlow(
  {
    name: 'getSustainabilityTipsFlow',
    inputSchema: GetSustainabilityTipsInputSchema,
    outputSchema: GetSustainabilityTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
