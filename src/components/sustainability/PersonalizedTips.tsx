
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GetPersonalizedSustainabilityTipsOutput } from '@/ai/flows/get-personalized-sustainability-tips';
import { getPersonalizedSustainabilityTips } from '@/ai/flows/get-personalized-sustainability-tips';
import ReactMarkdown from 'react-markdown';

export default function PersonalizedSustainabilityTips() {
    const [tips, setTips] = useState<GetPersonalizedSustainabilityTipsOutput | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTips() {
            try {
                // Example input for a trip to Betla National Park
                const input = {
                    destination: 'Betla National Park',
                    duration: '3',
                    interests: 'wildlife, photography',
                    travelScore: 850,
                    pastBookings: 'Hundru Falls Adventure',
                    transportationPreference: 'solo taxi',
                    accommodationPreference: 'hotel',
                };
                const result = await getPersonalizedSustainabilityTips(input);
                setTips(result);
            } catch (e) {
                setError('Failed to fetch AI-powered sustainability tips.');
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        fetchTips();
    }, []);

    return (
        <Card className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Sparkles className="text-primary" />
                    Smart AI Recommendations
                </CardTitle>
                <CardDescription>
                    Personalized sustainability suggestions for your next trip.
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
                {tips && (
                    <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert prose-p:text-muted-foreground prose-headings:text-foreground">
                        <ReactMarkdown>{tips.sustainabilityTips}</ReactMarkdown>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
