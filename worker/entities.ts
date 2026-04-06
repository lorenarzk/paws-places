import { IndexedEntity } from "./core-utils";
import type { User, Place, Review } from "@shared/types";
import { MOCK_USERS, MOCK_PLACES, MOCK_REVIEWS } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "", favorites: [] };
  static seedData = MOCK_USERS;
  async toggleFavorite(placeId: string): Promise<string[]> {
    const state = await this.ensureState();
    const favorites = state.favorites || [];
    const index = favorites.indexOf(placeId);
    let nextFavorites: string[];
    if (index === -1) {
      nextFavorites = [...favorites, placeId];
    } else {
      nextFavorites = favorites.filter(id => id !== placeId);
    }
    await this.mutate(s => ({ ...s, favorites: nextFavorites }));
    return nextFavorites;
  }
}
export class PlaceEntity extends IndexedEntity<Place> {
  static readonly entityName = "place";
  static readonly indexName = "places";
  static readonly initialState: Place = { 
    id: "", 
    title: "", 
    category: "Park", 
    image: "", 
    rating: 0, 
    description: "", 
    amenities: [], 
    rules: [] 
  };
  static seedData = MOCK_PLACES;
}
export class ReviewEntity extends IndexedEntity<Review> {
  static readonly entityName = "review";
  static readonly indexName = "reviews";
  static readonly initialState: Review = {
    id: "",
    placeId: "",
    userId: "",
    userName: "",
    rating: 0,
    comment: "",
    timestamp: 0
  };
  static seedData = MOCK_REVIEWS;
}