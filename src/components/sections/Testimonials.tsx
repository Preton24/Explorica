import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { testimonials } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function Testimonials() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold">
            Stories from Our Travelers
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            See what fellow adventurers are saying about their Jharkhand journeys.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map(testimonial => {
              const avatarImage = PlaceHolderImages.find(
                img => img.id === testimonial.avatar
              );
              return (
                <CarouselItem
                  key={testimonial.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
                      <CardContent className="flex flex-col items-center text-center p-8">
                        <Avatar className="w-20 h-20 mb-4">
                          {avatarImage && (
                            <AvatarImage
                              src={avatarImage.imageUrl}
                              alt={testimonial.name}
                              data-ai-hint={avatarImage.imageHint}
                            />
                          )}
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <p className="text-muted-foreground italic mb-4">
                          "{testimonial.text}"
                        </p>
                        <p className="font-bold font-headline">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.location}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}
