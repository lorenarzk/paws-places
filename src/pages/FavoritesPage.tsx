import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { PlaceCard } from '@/components/places/PlaceCard';
import { PlaceDetailSheet } from '@/components/places/PlaceDetailSheet';
import { useFavorites } from '@/hooks/use-places';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import type { Place } from '@shared/types';
export function FavoritesPage() {
  const { data: favorites, isLoading } = useFavorites();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <header className="mb-12 text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block p-3 bg-primary/10 sketch-border-sm mb-4"
            >
              <Heart className="h-8 w-8 text-primary fill-primary animate-pulse" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-sketch text-foreground">My Scrapbook</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A collection of your favorite tail-wagging spots and whiskers-approved corners.
            </p>
          </header>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-muted animate-pulse sketch-border" />
              ))}
            </div>
          ) : favorites && favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {favorites.map((place, idx) => (
                  <motion.div
                    key={place.id}
                    layout
                    initial={{ opacity: 0, rotate: idx % 2 === 0 ? -2 : 2 }}
                    animate={{ opacity: 1, rotate: idx % 2 === 0 ? -1 : 1 }}
                    whileHover={{ rotate: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PlaceCard
                      place={place as Place}
                      onClick={() => setSelectedPlace(place as Place)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-card sketch-border max-w-2xl mx-auto"
            >
              <div className="mb-6 text-6xl">🐾</div>
              <h3 className="text-2xl font-sketch mb-4">Your scrapbook is empty!</h3>
              <p className="text-muted-foreground mb-8">Go sniff out some incredible places to start your collection.</p>
              <Button asChild className="font-sketch text-lg h-12 px-8 bg-primary hover:bg-primary/90 sketch-border-sm">
                <Link to="/">Explore Spots</Link>
              </Button>
            </motion.div>
          )}
        </div>
      </main>
      <PlaceDetailSheet
        place={selectedPlace}
        open={!!selectedPlace}
        onOpenChange={(open) => !open && setSelectedPlace(null)}
      />
      <footer className="mt-20 border-t-2 border-primary/20 bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p className="font-sketch text-lg mb-2 text-foreground">Paws & Places</p>
          <p className="text-sm">Your personal pet-friendly journey. © 2024</p>
        </div>
      </footer>
    </div>
  );
}