import { Place, User, Review } from './types';
export const MOCK_PLACES: Place[] = [
  {
    id: 'p1',
    title: 'The Barking Bean',
    category: 'Cafe',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    description: 'A cozy corner for humans and hounds. We specialize in artisanal coffee and homemade pup-patties.',
    amenities: ['Indoor Seating', 'Water Bowls', 'Dog Treats', 'Free WiFi'],
    rules: ['Leash required indoors', 'Well-behaved pets only', 'No paws on tables']
  },
  {
    id: 'p2',
    title: 'Tail Wag Trail',
    category: 'Trail',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    description: 'A winding 3-mile path through ancient oaks and babbling brooks. Perfect for high-energy explorers.',
    amenities: ['Waste Stations', 'Water Fountains', 'Shaded Benches'],
    rules: ['Pick up after your pet', 'Keep to the path', 'Yield to horses']
  },
  {
    id: 'p3',
    title: 'Golden Retriever Gardens',
    category: 'Park',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    description: 'An expansive off-leash paradise with a dedicated agility course and splash pond.',
    amenities: ['Off-leash Area', 'Agility Course', 'Fenced Area', 'Pond'],
    rules: ['Up-to-date vaccinations', 'Owner supervision required', 'Max 3 dogs per person']
  },
  {
    id: 'p4',
    title: 'Paw-some Palace',
    category: 'Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    description: 'Luxury accommodation where your pet is treated like royalty. In-room doggie dining available.',
    amenities: ['Pet Sitting', 'Welcome Kits', 'Dog Beds Provided'],
    rules: ['No pets on furniture', 'Silence during quiet hours', 'Weight limit 50lbs']
  },
  {
    id: 'p5',
    title: 'Espresso & Ears',
    category: 'Cafe',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    description: 'The best puppuccinos in town. Vibrant atmosphere with a dedicated "fur-friends" patio.',
    amenities: ['Heated Patio', 'Organic Treats', 'Water Station'],
    rules: ['Dogs must be tethered to tables', 'Vaccination proof on request']
  }
];
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Pet Lover', favorites: ['p1', 'p3'] }
];
export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    placeId: 'p1',
    userId: 'u1',
    userName: 'Pet Lover',
    rating: 5,
    comment: 'Best doggy latte ever!',
    timestamp: Date.now()
  }
];