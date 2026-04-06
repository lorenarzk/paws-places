import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryFilters } from '@/components/home/CategoryFilters';
import { PlaceCard } from '@/components/places/PlaceCard';
import { PlaceDetailSheet } from '@/components/places/PlaceDetailSheet';
import { AddPlaceDialog } from '@/components/places/AddPlaceDialog';
import { usePlaces } from '@/hooks/use-places';
import type { Place } from '@shared/types';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { data: places, isLoading } = usePlaces(activeCategory);
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <HeroSection />
          <div className="my-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b-2 border-primary/20 pb-4">
              <div className="space-y-1">
                <h2 className="text-3xl font-sketch">Explore Spots</h2>
                <p className="text-sm text-muted-foreground">Find the perfect place for your furry friends</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <CategoryFilters active={activeCategory} onSelect={setActiveCategory} />
                <AddPlaceDialog />
              </div>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 bg-muted animate-pulse sketch-border" />
                ))}
              </div>
            ) : places && places.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {places.map((place) => (
                    <motion.div
                      key={place.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PlaceCard place={place} onClick={() => setSelectedPlace(place)} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-24 text-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <p className="text-6xl">🦴</p>
                  <h3 className="text-2xl font-sketch">Nothing here yet...</h3>
                  <p className="text-muted-foreground">Try a different category to sniff out some fun!</p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </main>
      <PlaceDetailSheet
        place={selectedPlace}
        open={!!selectedPlace}
        onOpenChange={(open) => !open && setSelectedPlace(null)}
      />
      <Toaster richColors position="top-center" />
      <footer className="border-t-2 border-primary/20 bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p className="font-sketch text-lg mb-2 text-foreground">Paws & Places</p>
          <p className="text-sm">Made with love for tails of all sizes. © 2024</p>
        </div>
      </footer>
    </div>
  );
}