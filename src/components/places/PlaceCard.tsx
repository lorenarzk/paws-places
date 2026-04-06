import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { Place } from '@shared/types';
interface PlaceCardProps {
  place: Place;
  onClick: () => void;
}
export function PlaceCard({ place, onClick }: PlaceCardProps) {
  return (
    <motion.div
      layout
      whileHover={{ y: -8, rotate: 1 }}
      onClick={onClick}
      className="group cursor-pointer bg-card sketch-border overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={place.image}
          alt={place.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-4 left-4 bg-background/90 text-foreground font-sketch border-2 border-primary">
          {place.category}
        </Badge>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-sketch text-foreground group-hover:text-primary transition-colors">
            {place.title}
          </h3>
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 sketch-border-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-bold">{place.rating}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {place.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          {place.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted px-2 py-1 rounded"
            >
              {amenity}
            </span>
          ))}
          {place.amenities.length > 3 && (
            <span className="text-[10px] font-bold text-muted-foreground">+ {place.amenities.length - 3}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}