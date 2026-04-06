import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Place, Review } from '@shared/types';
import { toast } from 'sonner';
const USER_ID = 'u1';
export function useGeolocation() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => setError(err.message)
    );
  };
  return { location, error, requestLocation };
}
export function useRealPlaces(lat?: number, lon?: number) {
  return useQuery({
    queryKey: ['real-places', lat, lon],
    queryFn: async () => {
      const osmData = await api<{ elements: any[] }>('/api/proxy/osm', {
        method: 'POST',
        body: JSON.stringify({ lat, lon })
      });
      return osmData.elements
        .filter(el => el.tags?.name)
        .map((el): Place => {
          const tags = el.tags || {};
          let category: Place['category'] = 'Cafe';
          if (tags.leisure === 'dog_park') category = 'Park';
          else if (tags.tourism === 'hotel') category = 'Hotel';
          else if (tags.route === 'hiking') category = 'Trail';
          return {
            id: `osm-${el.id}`,
            title: tags.name,
            category,
            image: `https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800`,
            rating: 0,
            description: tags.description || `A pet-friendly spot discovered via OpenStreetMap. ${tags.website ? 'Visit: ' + tags.website : ''}`,
            amenities: Object.keys(tags).filter(k => k.includes('dog') || k.includes('pet')).map(k => `${k}: ${tags[k]}`),
            rules: ['Standard pet etiquette applies']
          };
        });
    },
    enabled: !!lat && !!lon,
  });
}
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