import SustainabilityTipsForm from '@/components/forms/SustainabilityTipsForm';
import { Leaf } from 'lucide-react';

export default function SustainabilityTipsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <Leaf className="mx-auto h-16 w-16 text-primary" />
        <h1 className="font-headline text-5xl font-bold mt-4">Smart Sustainability Tips</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Get personalized AI recommendations for traveling responsibly and supporting local communities.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <SustainabilityTipsForm />
      </div>
    </div>
  );
}
