'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  getSustainabilityTipsAction,
  type SustainabilityState,
} from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles } from 'lucide-react';

const initialState: SustainabilityState = {
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
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Get Tips
    </Button>
  );
}

export default function SustainabilityTipsForm() {
  const [state, formAction] = useFormState(
    getSustainabilityTipsAction,
    initialState
  );

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="destination" className="font-semibold">Destination</Label>
              <Input
                id="destination"
                name="destination"
                placeholder="e.g., Betla National Park"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="font-semibold">Trip Duration (days)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                placeholder="e.g., 2"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests" className="font-semibold">Interests</Label>
              <Textarea
                id="interests"
                name="interests"
                placeholder="e.g., wildlife, local food, trekking"
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
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Eco-Travel Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm md:prose-base max-w-none prose-p:text-muted-foreground prose-headings:text-foreground">
              <pre className="whitespace-pre-wrap font-body text-sm bg-muted/50 p-4 rounded-md">{state.data.sustainabilityTips}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
