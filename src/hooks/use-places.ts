import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Place, Review } from '@shared/types';
import { toast } from 'sonner';
const USER_ID = 'u1'; // Mock logged in user for this phase
export function usePlaces(category?: string) {
  return useQuery({
    queryKey: ['places', category],
    queryFn: () => api<Place[]>(category && category !== 'All' ? `/api/places?category=${category}` : '/api/places'),
  });
}
export function useFavorites() {
  return useQuery({
    queryKey: ['favorites', USER_ID],
    queryFn: () => api<Place[]>(`/api/users/${USER_ID}/favorites`),
  });
}
export function useUser() {
  return useQuery({
    queryKey: ['user', USER_ID],
    queryFn: () => api<{ id: string, name: string, favorites: string[] }>(`/api/users/${USER_ID}`),
  });
}
export function useToggleFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (placeId: string) =>
      api<string[]>('/api/favorites/toggle', {
        method: 'POST',
        body: JSON.stringify({ userId: USER_ID, placeId }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', USER_ID] });
      queryClient.invalidateQueries({ queryKey: ['favorites', USER_ID] });
      toast.success('Favorites updated!');
    },
    onError: () => {
      toast.error('Failed to update favorites');
    }
  });
}
export function useReviews(placeId: string) {
  return useQuery({
    queryKey: ['reviews', placeId],
    queryFn: () => api<Review[]>(`/api/places/${placeId}/reviews`),
    enabled: !!placeId,
  });
}
export function useSubmitReview(placeId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { rating: number, comment: string }) =>
      api<Review>(`/api/places/${placeId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({ ...data, userId: USER_ID, userName: 'Pet Lover' }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', placeId] });
      toast.success('Review shared with the pack!');
    },
    onError: () => {
      toast.error('Failed to post review');
    }
  });
}
export function useCreatePlace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Place, 'id' | 'rating'>) =>
      api<Place>('/api/places', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
      toast.success('New spot sniffed out successfully!');
    },
    onError: () => {
      toast.error('Could not add this spot');
    }
  });
}