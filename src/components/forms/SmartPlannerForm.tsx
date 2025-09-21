'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  generateItineraryAction,
  type ItineraryState,
} from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Send } from 'lucide-react';

const initialState: ItineraryState = {
  formState: 'initial',
  message: '',
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Send className="mr-2 h-4 w-4" />
      )}
      Generate Plan
    </Button>
  );
}

export default function SmartPlannerForm() {
  const [state, formAction] = useFormState(
    generateItineraryAction,
    initialState
  );

  return (
    <div className="space-y-8">
      <Card className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
        <CardContent className="p-6">
          <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="duration" className="font-semibold">Duration (days)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  placeholder="e.g., 3"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget" className="font-semibold">Budget</Label>
                <Input
                  id="budget"
                  name="budget"
                  placeholder="e.g., $500, 10000 INR"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests" className="font-semibold">Interests</Label>
              <Textarea
                id="interests"
                name="interests"
                placeholder="e.g., eco-tourism, cultural sites, hiking, photography"
                required
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state.formState === 'error' && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.formState === 'success' && state.data && (
        <Card className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
          <CardHeader>
            <CardTitle className="font-headline">Your Custom Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm md:prose-base max-w-none prose-p:text-muted-foreground prose-headings:text-foreground">
                <pre className="whitespace-pre-wrap font-body text-sm bg-muted/50 p-4 rounded-md">{state.data.itinerary}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
