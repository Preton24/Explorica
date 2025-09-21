// src/ai/flows/generate-trip-itinerary.ts
'use server';
/**
 * @fileOverview Generates a personalized trip itinerary based on user inputs.
 *
 * - generateTripItinerary - A function that generates a trip itinerary.
 * - GenerateTripItineraryInput - The input type for the generateTripItinerary function.
 * - GenerateTripItineraryOutput - The return type for the generateTripItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTripItineraryInputSchema = z.object({
  duration: z.number().describe('The duration of the trip in days.'),
  budget: z.string().describe('The budget for the trip (e.g., "₹10000").'),
  interests: z.string().describe('The interests of the traveler (e.g., "eco-tourism, cultural sites").'),
});
export type GenerateTripItineraryInput = z.infer<typeof GenerateTripItineraryInputSchema>;

const GenerateTripItineraryOutputSchema = z.object({
  itinerary: z.string().describe('A detailed daily itinerary for the trip in Markdown format, including transportation, activities, and accommodations.'),
});
export type GenerateTripItineraryOutput = z.infer<typeof GenerateTripItineraryOutputSchema>;

export async function generateTripItinerary(input: GenerateTripItineraryInput): Promise<GenerateTripItineraryOutput> {
  return generateTripItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTripItineraryPrompt',
  input: {schema: GenerateTripItineraryInputSchema},
  output: {schema: GenerateTripItineraryOutputSchema},
  prompt: `You are an expert travel planner specializing in trips to Jharkhand, India. You will generate a daily itinerary for the user that includes transportation, activities, and accommodations, based on the specified duration, budget and interests.

Duration: {{{duration}}} days
Budget: {{{budget}}}
Interests: {{{interests}}}

Please provide a detailed itinerary including specific places, modes of transport, and estimated costs. Make sure to include eco-tourism and cultural spots.

Format the output as a Markdown document. Use headings for each day, bold text for key details like "Morning:", "Lunch:", "Afternoon:", and bullet points for lists of activities or costs.
`,
});

const generateTripItineraryFlow = ai.defineFlow(
  {
    name: 'generateTripItineraryFlow',
    inputSchema: GenerateTripItineraryInputSchema,
    outputSchema: GenerateTripItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
