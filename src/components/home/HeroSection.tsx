import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useGeolocation } from '@/hooks/use-places';
export function HeroSection() {
  const { location } = useGeolocation();
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-sketch text-foreground leading-tight max-w-4xl mx-auto">
            Discover <span className="text-primary underline decoration-wavy decoration-2 underline-offset-8">Pet-Approved</span> Adventures
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {location 
            ? "Sniffing out the best spots in your neighborhood right now!"
            : "The most whimsical directory for parks, cafes, and stays where your best friend is always the guest of honor."
          }
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto relative group"
        >
          <div className="flex items-center gap-2 p-2 bg-card sketch-border shadow-lg">
            {location ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="ml-3"
              >
                <MapPin className="h-5 w-5 text-primary" />
              </motion.div>
            ) : (
              <Search className="ml-3 h-5 w-5 text-muted-foreground" />
            )}
            <Input
              placeholder={location ? "Searching near you..." : "Search for 'dog parks' or 'cat cafes'..."}
              className="border-none bg-transparent focus-visible:ring-0 text-lg h-12"
            />
            <Button className="h-12 px-8 text-lg font-sketch bg-primary hover:bg-primary/90 text-primary-foreground sketch-border-sm transition-transform hover:scale-105 active:scale-95">
              Sniff it Out
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}