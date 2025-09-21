'use client';
import { useEffect, useState } from 'react';
import { getPersonalizedRecommendationsAction } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { PersonalizedRecommendationsOutput } from '@/ai/flows/receive-personalized-recommendations';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

export default function PersonalizedRecs() {
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      const input = {
        travelScore: 850,
        pastBookings: 'Deoghar Spiritual Journey, Patratu Valley Drive',
        interests: 'culture, nature, photography',
      };
      
      const result = await getPersonalizedRecommendationsAction(input);

      if ('error' in result) {
        setError(result.error);
      } else {
        setRecommendations(result);
      }
      setLoading(false);
    }

    fetchRecommendations();
  }, []);

  return (
    <Card className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="text-primary" />
          Smart Recommendations
        </CardTitle>
        <CardDescription>
          AI-powered suggestions based on your travel style.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center h-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {recommendations && (
          <div className="prose prose-sm md:prose-base max-w-none prose-p:text-muted-foreground">
             <pre className="whitespace-pre-wrap font-body text-sm bg-muted/50 p-4 rounded-md">{recommendations.recommendations}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
