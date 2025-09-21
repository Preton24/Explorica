'use server';

import {
  generateTripItinerary,
  GenerateTripItineraryInput,
  GenerateTripItineraryOutput,
} from '@/ai/flows/generate-trip-itinerary';
import {
  getSustainabilityTips,
  GetSustainabilityTipsInput,
  GetSustainabilityTipsOutput,
} from '@/ai/flows/get-sustainability-tips';
import {
  receivePersonalizedRecommendations,
  PersonalizedRecommendationsInput,
  PersonalizedRecommendationsOutput,
} from '@/ai/flows/receive-personalized-recommendations';
import {
  chatWithTravelBuddy,
  ChatWithTravelBuddyInput,
  ChatWithTravelBuddyOutput,
} from '@/ai/flows/travel-buddy-flow';
import { z } from 'zod';

const tripSchema = z.object({
  duration: z.coerce.number().min(1, 'Duration must be at least 1 day.'),
  budget: z.string().min(1, 'Budget is required.'),
  interests: z.string().min(3, 'Please list some interests.'),
});

export interface ItineraryState {
  formState: 'initial' | 'loading' | 'success' | 'error';
  message: string;
  data: GenerateTripItineraryOutput | null;
}

export async function generateItineraryAction(
  prevState: ItineraryState,
  formData: FormData
): Promise<ItineraryState> {
  const validatedFields = tripSchema.safeParse({
    duration: formData.get('duration'),
    budget: formData.get('budget'),
    interests: formData.get('interests'),
  });

  if (!validatedFields.success) {
    return {
      formState: 'error',
      message:
        validatedFields.error.flatten().fieldErrors.duration?.[0] ||
        validatedFields.error.flatten().fieldErrors.budget?.[0] ||
        validatedFields.error.flatten().fieldErrors.interests?.[0] ||
        'Invalid input.',
      data: null,
    };
  }

  try {
    const result = await generateTripItinerary(validatedFields.data);
    return {
      formState: 'success',
      message: 'Here is your personalized itinerary!',
      data: result,
    };
  } catch (error) {
    return {
      formState: 'error',
      message:
        error instanceof Error ? error.message : 'An unknown error occurred.',
      data: null,
    };
  }
}

const tipsSchema = z.object({
  destination: z.string().min(1, 'Destination is required.'),
  duration: z.string().min(1, 'Duration is required.'),
  interests: z.string().min(3, 'Please list some interests.'),
});

export interface SustainabilityState {
  formState: 'initial' | 'loading' | 'success' | 'error';
  message: string;
  data: GetSustainabilityTipsOutput | null;
}

export async function getSustainabilityTipsAction(
  prevState: SustainabilityState,
  formData: FormData
): Promise<SustainabilityState> {
  const validatedFields = tipsSchema.safeParse({
    destination: formData.get('destination'),
    duration: formData.get('duration'),
    interests: formData.get('interests'),
  });

  if (!validatedFields.success) {
    return {
      formState: 'error',
      message: 'Invalid input.',
      data: null,
    };
  }
  
  try {
    const result = await getSustainabilityTips(validatedFields.data);
    return {
      formState: 'success',
      message: 'Here are your personalized sustainability tips!',
      data: result,
    };
  } catch (error) {
    return {
      formState: 'error',
      message:
        error instanceof Error ? error.message : 'An unknown error occurred.',
      data: null,
    };
  }
}

export async function getPersonalizedRecommendationsAction(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput | { error: string }> {
  try {
    const recommendations = await receivePersonalizedRecommendations(input);
    return recommendations;
  } catch (e) {
    return { error: 'Failed to fetch recommendations.' };
  }
}

export async function sendMessageToTravelBuddyAction(input: ChatWithTravelBuddyInput): Promise<ChatWithTravelBuddyOutput | { error: string }> {
    try {
        const response = await chatWithTravelBuddy(input);
        return response;
    } catch (e) {
        console.error(e);
        return { error: 'Sorry, I had some trouble processing that. Please try again.' };
    }
}
