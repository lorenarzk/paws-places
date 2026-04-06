
import { Dog, Heart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
export function Navbar() {
  const location = useLocation();
  const navItems = [
    { label: 'Explore', path: '/' },
    { label: 'About', path: '/about' },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary p-1.5 sketch-border-sm text-primary-foreground group-hover:rotate-12 transition-transform">
              <Dog className="h-6 w-6" />
            </div>
            <span className="text-2xl font-sketch text-foreground">Paws & Places</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                asChild
                className={cn(
                  "font-medium hover:text-primary transition-all",
                  location.pathname === item.path && "text-primary border-b-2 border-primary rounded-none"
                )}
              >
                <Link to={item.path}>{item.label}</Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className={cn(
                "text-muted-foreground hover:text-primary transition-colors",
                location.pathname === '/favorites' && "text-primary"
              )}
            >
              <Link to="/favorites">
                <Heart className={cn("h-5 w-5", location.pathname === '/favorites' && "fill-primary")} />
              </Link>
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