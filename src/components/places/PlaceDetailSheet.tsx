import React, { FormEvent, useState } from 'react';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Star, Info, CheckCircle2, Loader2, MessageSquare, Send } from 'lucide-react';
import type { Place } from '@shared/types';
import { useUser, useToggleFavorite, useReviews, useSubmitReview } from '@/hooks/use-places';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
interface PlaceDetailSheetProps {
  place: Place | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function PlaceDetailSheet({ place, open, onOpenChange }: PlaceDetailSheetProps) {
  const { data: user } = useUser();
  const toggleFavorite = useToggleFavorite();
  const { data: reviews, isLoading: reviewsLoading } = useReviews(place?.id || '');
  const submitReview = useSubmitReview(place?.id || '');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  if (!place) return null;
  const isFavorited = user?.favorites?.includes(place.id);
  const isRealWorld = place.id.startsWith('osm-');
  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    submitReview.mutate({ rating, comment }, {
      onSuccess: () => {
        setComment('');
        setRating(5);
      }
    });
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto no-scrollbar border-l-4 border-primary/20">
        <div className="relative h-64 -mx-6 mb-6">
          <img src={place.image} alt={place.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="font-bold text-xl">{place.rating > 0 ? place.rating : (isRealWorld ? 'New Spot' : 'Verified')}</span>
            </div>
            <h2 className="text-4xl font-sketch">{place.title}</h2>
          </div>
        </div>
        <div className="space-y-8">
          <Button
            onClick={() => toggleFavorite.mutate(place.id)}
            disabled={toggleFavorite.isPending}
            className={cn(
              "w-full h-12 text-lg font-sketch bg-primary hover:bg-primary/90 sketch-border-sm transition-all",
              isFavorited && "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {toggleFavorite.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Heart className={cn("mr-2 h-5 w-5", isFavorited && "fill-current")} />}
            {isFavorited ? 'Saved in Scrapbook' : 'Save to Favorites'}
          </Button>
          <div className="space-y-4">
            <h3 className="text-xl font-sketch flex items-center gap-2"><Info className="h-5 w-5 text-primary" /> About</h3>
            <p className="text-muted-foreground leading-relaxed">{place.description}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-sketch flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Rules</h3>
            <ul className="grid grid-cols-1 gap-3">
              {(place.rules && place.rules.length > 0) ? place.rules.map((rule, idx) => (
                <li key={idx} className="flex items-center gap-3 p-3 bg-muted/50 sketch-border-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{rule}</span>
                </li>
              )) : (
                <li className="flex items-center gap-3 p-3 bg-muted/50 sketch-border-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium italic">Standard pet etiquette applies here.</span>
                </li>
              )}
            </ul>
          </div>
          <div className="space-y-6 pb-10">
            <h3 className="text-xl font-sketch flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Community Barks</h3>
            <form onSubmit={handleSubmitReview} className="space-y-3 bg-muted/30 p-4 sketch-border-sm">
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                    <Star className={cn("h-6 w-6 transition-colors", star <= rating ? "fill-primary text-primary" : "text-muted-foreground")} />
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="sketch-border-sm bg-background border-none"
              />
              <Button type="submit" size="sm" className="w-full font-sketch bg-primary" disabled={submitReview.isPending}>
                {submitReview.isPending ? <Loader2 className="animate-spin" /> : <><Send className="mr-2 h-4 w-4" /> Bark it out</>}
              </Button>
            </form>
            <div className="space-y-4">
              {reviewsLoading ? (
                <div className="space-y-4">
                  {[1, 2].map(i => <div key={i} className="h-24 bg-muted animate-pulse sketch-border-sm" />)}
                </div>
              ) : reviews?.length === 0 ? (
                <p className="text-center text-muted-foreground py-4 italic">No barks yet. Be the first!</p>
              ) : (
                reviews?.map((review) => (
                  <div key={review.id} className="p-4 bg-background sketch-border-sm shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-sm">{review.userName}</span>
                      <span className="text-[10px] text-muted-foreground">{format(review.timestamp, 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={cn("h-3 w-3", i < review.rating ? "fill-primary text-primary" : "text-muted-foreground")} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}