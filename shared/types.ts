export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface Place {
  id: string;
  title: string;
  category: 'Park' | 'Cafe' | 'Hotel' | 'Trail';
  image: string;
  rating: number;
  description: string;
  amenities: string[];
  rules: string[];
}
export interface Review {
  id: string;
  placeId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: number;
}
export interface User {
  id: string;
  name: string;
  favorites: string[]; // IDs of favorite places
}