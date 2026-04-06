import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Coffee, Trees, Bed, Mountain } from 'lucide-react';
const CATEGORIES = [
  { label: 'All', icon: null },
  { label: 'Parks', icon: Trees },
  { label: 'Cafes', icon: Coffee },
  { label: 'Hotels', icon: Bed },
  { label: 'Trails', icon: Mountain },
];
interface CategoryFiltersProps {
  active: string;
  onSelect: (category: string) => void;
}
export function CategoryFilters({ active, onSelect }: CategoryFiltersProps) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
      {CATEGORIES.map((cat, idx) => {
        const Icon = cat.icon;
        const isActive = active === cat.label;
        return (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Button
              onClick={() => onSelect(cat.label)}
              className={cn(
                "h-12 px-6 flex items-center gap-2 transition-all duration-300 sketch-border-sm hover:rotate-2 hover:scale-105",
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground hover:bg-muted"
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span className="font-medium">{cat.label}</span>
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}