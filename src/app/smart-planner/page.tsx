'use client';
import React from 'react';
import SmartPlannerForm from '@/components/forms/SmartPlannerForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';

export default function SmartPlannerPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <Bot className="mx-auto h-16 w-16 text-primary" />
        <h1 className="font-headline text-5xl font-bold mt-4">AI Smart Planner</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Let our AI craft the perfect Jharkhand itinerary for you. Just tell us your preferences!
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <SmartPlannerForm />
      </div>
    </div>
  );
}
