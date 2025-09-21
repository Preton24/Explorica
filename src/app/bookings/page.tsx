import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Calendar, Clock, Download, MapPin, Users } from 'lucide-react';

function TicketCard() {
  const qrImage = PlaceHolderImages.find(img => img.id === 'ticket-qr');

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/10 p-4">
        <CardTitle className="font-headline text-primary">Hundru Falls Adventure</CardTitle>
        <CardDescription>Guided Tour</CardDescription>
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Hundru, Jharkhand</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>December 25, 2024</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>2 Adults, 1 Child</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          {qrImage && (
            <Image
              src={qrImage.imageUrl}
              alt="QR Code"
              width={100}
              height={100}
              data-ai-hint={qrImage.imageHint}
              className="rounded-md"
            />
          )}
          <span className="text-xs text-muted-foreground">Scan for verification</span>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
        <div className="text-sm">
          <span className="text-muted-foreground">Booking ID: </span>
          <span className="font-mono">HJ-1A2B3C</span>
        </div>
        <Button size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download Ticket
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function BookingsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Manage your upcoming trips and view your travel history.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
          <TabsTrigger value="past">Past Trips</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <div className="mt-8 grid gap-6">
            <TicketCard />
            {/* Add more upcoming trip cards here */}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="mt-8 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Deoghar Spiritual Journey</CardTitle>
                <CardDescription>Completed on Oct 15, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">A memorable trip to the Baidyanath Temple.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Details</Button>
              </CardFooter>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Patratu Valley Drive</CardTitle>
                <CardDescription>Completed on Jul 02, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Enjoyed the scenic beauty and winding roads.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
