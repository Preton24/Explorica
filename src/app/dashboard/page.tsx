import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Award, BadgeCheck, BarChart, Bell, Calendar, Edit, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import PersonalizedRecs from '@/components/dashboard/PersonalizedRecs';

function ProfileCard() {
  const avatar = PlaceHolderImages.find(img => img.id === 'avatar-1');
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            {avatar && <AvatarImage src={avatar.imageUrl} alt="User" data-ai-hint={avatar.imageHint} />}
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="font-headline text-2xl">Guest User</CardTitle>
            <CardDescription>Travel Score: 850</CardDescription>
          </div>
        </div>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <span>Eco-Warrior Badge</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-green-500" />
            <span>Verified Traveler</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function UpcomingTrips() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Upcoming Trips</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div>
            <p className="font-semibold">Hundru Falls Adventure</p>
            <p className="text-sm text-muted-foreground">December 25, 2024</p>
          </div>
          <Button variant="secondary" size="sm">View Ticket</Button>
        </div>
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div>
            <p className="font-semibold">Netarhat Sunrise Trip</p>
            <p className="text-sm text-muted-foreground">January 10, 2025</p>
          </div>
          <Button variant="secondary" size="sm">View Ticket</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PersonalExposureScore() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <ShieldCheck className="text-primary" />
          Personal Exposure Score
        </CardTitle>
        <CardDescription>
          Composite risk for your current location.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
         <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Overall Risk</span>
            <span className="text-sm font-bold text-yellow-500">Moderate</span>
          </div>
          <Progress value={55} className="h-2" />
        </div>
        <p className="text-sm text-muted-foreground">Based on AQI of 68 and low travel safety alerts.</p>
        <Button variant="outline" className="w-full">View Heat Maps</Button>
      </CardContent>
    </Card>
  );
}

function Notifications() {
   return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <div className="bg-primary/10 p-2 rounded-full h-fit">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm">Your trip to Netarhat is confirmed!</p>
            <p className="text-xs text-muted-foreground">2 days ago</p>
          </div>
        </div>
         <div className="flex gap-3">
          <div className="bg-green-500/10 p-2 rounded-full h-fit">
            <BarChart className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="font-semibold text-sm">New! 5% discount on eco-lodges.</p>
            <p className="text-xs text-muted-foreground">5 days ago</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <ProfileCard />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <UpcomingTrips />
            <PersonalizedRecs />
        </div>
        <div className="lg:col-span-1 space-y-8">
            <PersonalExposureScore />
            <Notifications />
        </div>
      </div>
    </div>
  );
}
