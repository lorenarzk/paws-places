import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Place } from '@shared/types';
import { toast } from 'sonner';
const USER_ID = 'u1'; // Mock logged in user for this phase
export function usePlaces(category?: string) {
  return useQuery({
    queryKey: ['places', category],
    queryFn: () => api<Place[]>(category ? `/api/places?category=${category}` : '/api/places'),
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
    onSuccess: (newFavorites) => {
      queryClient.invalidateQueries({ queryKey: ['user', USER_ID] });
      queryClient.invalidateQueries({ queryKey: ['favorites', USER_ID] });
      toast.success('Favorites updated!');
    },
    onError: () => {
      toast.error('Failed to update favorites');
    }
  });
}