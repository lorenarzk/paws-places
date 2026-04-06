import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Heart, Star, Info, CheckCircle2 } from 'lucide-react';
import { Place } from '@shared/mock-data';
interface PlaceDetailSheetProps {
  place: Place | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function PlaceDetailSheet({ place, open, onOpenChange }: PlaceDetailSheetProps) {
  if (!place) return null;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto no-scrollbar">
        <div className="relative h-64 -mx-6 mb-6">
          <img
            src={place.image}
            alt={place.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="font-bold text-xl">{place.rating}</span>
            </div>
            <h2 className="text-4xl font-sketch">{place.title}</h2>
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex gap-4">
            <Button className="flex-1 h-12 text-lg font-sketch bg-primary hover:bg-primary/90 sketch-border-sm">
              <Heart className="mr-2 h-5 w-5" /> Save to Favorites
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-sketch flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" /> About this Place
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {place.description}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-sketch flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> Rules for Paws
            </h3>
            <ul className="grid grid-cols-1 gap-3">
              {place.rules.map((rule, idx) => (
                <li key={idx} className="flex items-center gap-3 p-3 bg-muted/50 sketch-border-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 pb-10">
            <h3 className="text-xl font-sketch">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {place.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium sketch-border-sm"
                >
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}