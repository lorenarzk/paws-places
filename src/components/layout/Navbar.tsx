import React from 'react';
import { Dog, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary p-1.5 sketch-border-sm text-primary-foreground group-hover:rotate-12 transition-transform">
              <Dog className="h-6 w-6" />
            </div>
            <span className="text-2xl font-sketch text-foreground">Paws & Places</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="font-medium hover:text-primary">Explore</Button>
            <Button variant="ghost" className="font-medium hover:text-primary">About</Button>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Heart className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9 border-2 border-primary sketch-border-sm">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=paws" />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}