// src/ai/flows/generate-smart-itinerary.ts
'use server';
/**
 * @fileOverview Generates a personalized and smart trip itinerary based on user inputs.
 *
 * - generateSmartItinerary - A function that generates a smart trip itinerary.
 * - GenerateSmartItineraryInput - The input type for the generateSmartItinerary function.
 * - GenerateSmartItineraryOutput - The return type for the generateSmartItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSmartItineraryInputSchema = z.object({
  destination: z.string().describe('The destination for the trip (e.g., \"Ranchi\").'),
  duration: z.number().describe('The duration of the trip in days.'),
  budget: z.string().describe('The budget for the trip (e.g., \"₹40000\").'),
  interests: z.string().describe('The interests of the traveler (e.g., \"eco-tourism, cultural sites\").'),
  transportationPreference: z.string().optional().describe('The preferred mode of transportation (e.g., train, bus, flight).'),
  accommodationPreference: z.string().optional().describe('The preferred type of accommodation (e.g., homestay, hotel).'),
});
export type GenerateSmartItineraryInput = z.infer<typeof GenerateSmartItineraryInputSchema>;

const GenerateSmartItineraryOutputSchema = z.object({
  itinerary: z.string().describe('A detailed daily itinerary for the trip, including transportation, activities, and accommodations, with eco-friendly and sustainable options highlighted.'),
});
export type GenerateSmartItineraryOutput = z.infer<typeof GenerateSmartItineraryOutputSchema>;

export async function generateSmartItinerary(input: GenerateSmartItineraryInput): Promise<GenerateSmartItineraryOutput> {
  return generateSmartItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSmartItineraryPrompt',
  input: {schema: GenerateSmartItineraryInputSchema},
  output: {schema: GenerateSmartItineraryOutputSchema},
  prompt: `You are an expert travel planner specializing in eco-friendly and sustainable trips to {{destination}}. You will generate a daily itinerary for the user that includes transportation, activities, and accommodations, based on the specified duration, budget, interests, transportation preference and accommodation preference. Prioritize sustainable options.

Destination: {{destination}}
Duration: {{{duration}}} days
Budget: {{{budget}}}
Interests: {{{interests}}}
Transportation Preference: {{transportationPreference}}
Accommodation Preference: {{accommodationPreference}}

Please provide a detailed itinerary including specific places, modes of transport (prioritizing eco-friendly options), sustainable accommodations (like local homestays or eco-lodges), and estimated costs. Focus on activities that support local communities and minimize environmental impact. Highlight opportunities to reduce carbon footprint and promote responsible travel.
`,
});

const generateSmartItineraryFlow = ai.defineFlow(
  {
    name: 'generateSmartItineraryFlow',
    inputSchema: GenerateSmartItineraryInputSchema,
    outputSchema: GenerateSmartItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
