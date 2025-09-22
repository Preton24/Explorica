import { destinations } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Tent, Plane, Bus, Train, Camera, Zap, Bike, User, ShoppingBag, MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const destination = destinations.find(d => d.slug === params.slug);

  if (!destination) {
    notFound();
  }

  const destImage = PlaceHolderImages.find(img => img.id === destination.image);

  const activities = [
    { title: 'Guided Waterfall Hike', icon: Camera, price: 'Rs.2,000 onwards' },
    { title: 'Jungle Safari', icon: Zap, price: 'Rs.4,000 onwards' },
    { title: 'Local Village Tour', icon: Bike, price: 'Rs.1,200 onwards' },
  ];

  const guides = [
    { name: 'Sanjay Oraon', avatarId: 'guide-1', expertise: 'Wildlife & Birding' },
    { name: 'Anita Kumari', avatarId: 'guide-2', expertise: 'Cultural & History' },
  ];

  const handicrafts = [
    { name: 'Dokra Art Figurine', imageId: 'handicraft-1', price: 'Rs.1500' },
    { name: 'Sohrai Painting', imageId: 'handicraft-2', price: 'Rs.2500' },
    { name: 'Bamboo Basket', imageId: 'handicraft-3', price: 'Rs.800' },
  ];

  const reviews = [
      { id: 1, name: 'Priya S.', avatarId: 'avatar-1', rating: 5, text: "The waterfall hike was breathtaking! Our guide, Sanjay, was incredibly knowledgeable about the local flora and fauna." },
      { id: 2, name: 'Raj K.', avatarId: 'avatar-3', text: "A must-visit place. The homestay we booked through the app was cozy and the family was very welcoming. Loved the local food." },
  ];

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="relative h-[60vh] rounded-2xl overflow-hidden mb-12">
        {destImage && (
          <Image
            src={destImage.imageUrl}
            alt={destination.name}
            data-ai-hint={destImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="font-headline text-5xl md:text-7xl font-bold drop-shadow-md">{destination.name}</h1>
          <p className="flex items-center gap-2 mt-2 text-lg"><MapPin className="w-5 h-5" /> Jharkhand, India</p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* About Section */}
          <section>
            <h2 className="font-headline text-3xl font-bold mb-4">About {destination.name}</h2>
            <div className="flex items-center gap-4 mb-4">
              <Badge>{destination.category}</Badge>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{destination.rating}</span>
                <span className="text-sm text-muted-foreground">(100+ reviews)</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{destination.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </section>

          <Separator />

          {/* Book Activities Section */}
          <section>
            <h2 className="font-headline text-3xl font-bold mb-6">Book an Activity</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map(activity => (
                <Card key={activity.title} className="overflow-hidden group transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
                  <CardHeader className="flex-row items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <activity.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-lg">{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Experience the thrill and beauty of Jharkhand with our expert guides.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <p className="font-bold">{activity.price}</p>
                    <Button>Book Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          <Separator />

           {/* Meet Local Guides */}
          <section>
            <h2 className="font-headline text-3xl font-bold mb-6">Meet Local Guides</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {guides.map(guide => {
                const guideAvatar = PlaceHolderImages.find(img => img.id === guide.avatarId);
                return (
                  <Card key={guide.name} className="flex flex-col items-center p-6 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
                    <Avatar className="w-24 h-24 mb-4">
                      {guideAvatar && <AvatarImage src={guideAvatar.imageUrl} alt={guide.name} data-ai-hint={guideAvatar.imageHint} />}
                      <AvatarFallback>{guide.name[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-xl">{guide.name}</CardTitle>
                    <CardDescription className="mb-4">{guide.expertise}</CardDescription>
                    <Button>Book a Tour</Button>
                  </Card>
                )
              })}
            </div>
          </section>

          <Separator />

          {/* Shop Local Handicrafts */}
          <section>
            <h2 className="font-headline text-3xl font-bold mb-6">Shop Local Handicrafts</h2>
             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {handicrafts.map(item => {
                const itemImage = PlaceHolderImages.find(img => img.id === item.imageId);
                return (
                <Card key={item.name} className="overflow-hidden group transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
                  <CardHeader className="p-0 relative h-48">
                    {itemImage && (
                      <Image
                        src={itemImage.imageUrl}
                        alt={item.name}
                        data-ai-hint={itemImage.imageHint}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </CardHeader>
                  <CardContent className="p-4">
                     <CardTitle className="font-headline text-lg mb-2">{item.name}</CardTitle>
                     <CardDescription>Authentic, handmade by local artisans.</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <p className="font-bold">{item.price}</p>
                    <Button asChild variant="secondary">
                      <Link href="/cart">Add to Cart</Link>
                    </Button>
                  </CardFooter>
                </Card>
                )
              })}
            </div>
          </section>

          <Separator />

          {/* Reviews & Ratings */}
          <section>
              <h2 className="font-headline text-3xl font-bold mb-6">Reviews & Ratings</h2>
              <div className="space-y-6">
                  {reviews.map(review => {
                      const reviewAvatar = PlaceHolderImages.find(img => img.id === review.avatarId);
                      return (
                          <Card key={review.id} className="p-6">
                              <div className="flex items-start gap-4">
                                  <Avatar>
                                      {reviewAvatar && <AvatarImage src={reviewAvatar.imageUrl} alt={review.name} />}
                                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                      <div className="flex justify-between items-center mb-1">
                                          <p className="font-semibold">{review.name}</p>
                                          {review.rating && (
                                              <div className="flex items-center gap-1">
                                                  {[...Array(review.rating)].map((_, i) => (
                                                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                  ))}
                                              </div>
                                          )}
                                      </div>
                                      <p className="text-sm text-muted-foreground">{review.text}</p>
                                  </div>
                              </div>
                          </Card>
                      );
                  })}
              </div>
          </section>

        </div>

        <div className="lg:col-span-1 space-y-8">
            {/* Book Your Stay Section */}
            <Card className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Tent className="text-primary" />
                        Book Your Stay
                    </CardTitle>
                    <CardDescription>Homestays, hotels, and eco-lodges.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Simplified booking form */}
                    <Button className="w-full">Check Availability</Button>
                </CardContent>
            </Card>

            {/* Book Transportation Section */}
            <Card className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline">Book Transportation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-around">
                       <Button variant="outline" size="icon" className="h-14 w-14 rounded-full"><Plane /></Button>
                       <Button variant="outline" size="icon" className="h-14 w-14 rounded-full"><Train /></Button>
                       <Button variant="outline" size="icon" className="h-14 w-14 rounded-full"><Bus /></Button>
                    </div>
                    <Button className="w-full">Find Transport</Button>
                </CardContent>
            </Card>
        </div>
      </div>

    </div>
  );
}
