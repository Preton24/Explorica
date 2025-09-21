
'use client';

import { Leaf, Award, Lightbulb, ShieldCheck, ShoppingCart, Train, Users, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PersonalizedSustainabilityTips from '@/components/sustainability/PersonalizedTips';

const generalTips = [
    {
      icon: Train,
      title: 'Green Transportation',
      description: 'Opt for trains, buses, or shared taxis instead of flights or private cars to reduce your carbon footprint.',
    },
    {
      icon: Users,
      title: 'Support Local',
      description: 'Choose local homestays, eat at local restaurants, and buy from local artisans to support the community.',
    },
    {
      icon: ShoppingCart,
      title: 'Plastic-Free Packing',
      description: 'Carry a reusable water bottle, cloth bags, and avoid single-use plastics to minimize waste.',
    },
];

function EcoScoreTracker() {
    return (
        <Card className="w-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Award className="text-primary" />
                    Your Eco Score
                </CardTitle>
                <CardDescription>
                    Track and improve your positive impact.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center">
                    <p className="text-5xl font-bold text-primary">750</p>
                    <p className="text-muted-foreground">Points</p>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Next Reward: Eco-Explorer Badge</span>
                        <span className="text-sm font-bold">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                </div>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Travel Score: 850</Badge>
                    <Badge variant="secondary">3 Eco-Trips</Badge>
                    <Badge variant="secondary">5 Sustainable Choices</Badge>
                </div>
                <Button variant="outline" className="w-full">
                    View Your Impact Report
                </Button>
            </CardContent>
        </Card>
    );
}

export default function SustainabilityTipsPage() {
    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <Leaf className="mx-auto h-16 w-16 text-primary" />
                <h1 className="font-headline text-5xl font-bold mt-4">Travel with Purpose</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Learn how to travel responsibly, minimize your impact, and contribute positively to the places you visit.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Curated Tips Section */}
                    <Card className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2">
                                <Lightbulb className="text-primary" />
                                Curated Eco-Travel Tips
                            </CardTitle>
                            <CardDescription>General advice for any responsible traveler.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-3 gap-6">
                            {generalTips.map((tip) => (
                                <div key={tip.title} className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                                    <tip.icon className="w-10 h-10 text-primary mb-3" />
                                    <h3 className="font-semibold mb-1">{tip.title}</h3>
                                    <p className="text-xs text-muted-foreground">{tip.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* AI Recommendations Section */}
                    <PersonalizedSustainabilityTips />
                </div>
                
                <div className="lg:col-span-1">
                    {/* Eco Score Tracker */}
                    <EcoScoreTracker />
                </div>
            </div>
        </div>
    );
}
