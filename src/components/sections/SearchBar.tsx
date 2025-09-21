'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { MapPin, Calendar as CalendarIcon, Search, MountainSnow } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function SearchBar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <section className="py-12 bg-transparent -mt-20 relative z-10">
      <div className="container">
        <Card className="glass-card shadow-2xl">
          <CardContent className="p-6">
            <form className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 items-center">
              <div className="relative md:col-span-2 lg:col-span-3">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Where to?" className="pl-10 h-12 text-sm" />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal h-12 text-sm',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                 <Select>
                  <SelectTrigger className="h-12 text-sm">
                    <div className="flex items-center gap-2">
                      <MountainSnow className="h-5 w-5 text-muted-foreground" />
                      <SelectValue placeholder="Travel Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eco-tourism">Eco-tourism</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="spiritual">Spiritual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <Button size="lg" className="w-full h-12">
                  <Search className="h-5 w-5" />
                  <span className="md:hidden lg:inline ml-2">Search</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
