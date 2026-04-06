import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, PlaceEntity, ReviewEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // OSM PROXY
  app.post('/api/proxy/osm', async (c) => {
    try {
      const { lat, lon, radius = 5000 } = await c.req.json() as { lat: number, lon: number, radius?: number };
      if (!lat || !lon) return bad(c, 'lat and lon are required');
      const query = `
        [out:json][timeout:25];
        (
          node["leisure"="dog_park"](around:${radius},${lat},${lon});
          way["leisure"="dog_park"](around:${radius},${lat},${lon});
          node["amenity"="cafe"]["dog"="yes"](around:${radius},${lat},${lon});
          node["amenity"="restaurant"]["dog"="yes"](around:${radius},${lat},${lon});
          node["tourism"="hotel"]["dog"="yes"](around:${radius},${lat},${lon});
        );
        out body;
        >;
        out skel qt;
      `;
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: `data=${encodeURIComponent(query)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      if (!response.ok) throw new Error('OSM API failed');
      const data = await response.json();
      return ok(c, data);
    } catch (err) {
      console.error('[OSM PROXY ERROR]', err);
      return bad(c, 'Failed to fetch real-world data');
    }
  });
  // PLACES
  app.get('/api/places', async (c) => {
    await PlaceEntity.ensureSeed(c.env);
    const category = c.req.query('category');
    const { items } = await PlaceEntity.list(c.env);
    if (category && category !== 'All') {
      const filtered = items.filter(p => p.category === category || (category.endsWith('s') && p.category === category.slice(0, -1)));
      return ok(c, filtered);
    }
    return ok(c, items);
  });
  app.post('/api/places', async (c) => {
    const data = await c.req.json() as any;
    const place = await PlaceEntity.create(c.env, {
      id: crypto.randomUUID(),
      rating: 0,
      ...data
    });
    return ok(c, place);
  });
  // USERS & FAVORITES
  app.get('/api/users/:id', async (c) => {
    const user = new UserEntity(c.env, c.req.param('id'));
    if (!await user.exists()) return notFound(c, 'user not found');
    return ok(c, await user.getState());
  });
  app.post('/api/favorites/toggle', async (c) => {
    const { userId, placeId } = await c.req.json() as { userId: string, placeId: string };
    if (!isStr(userId) || !isStr(placeId)) return bad(c, 'userId and placeId required');
    const user = new UserEntity(c.env, userId);
    if (!await user.exists()) return notFound(c, 'user not found');
    const favorites = await user.toggleFavorite(placeId);
    return ok(c, favorites);
  });
  app.get('/api/users/:id/favorites', async (c) => {
    const user = new UserEntity(c.env, c.req.param('id'));
    if (!await user.exists()) return notFound(c, 'user not found');
    const { favorites } = await user.getState();
    const allPlaces = await PlaceEntity.list(c.env);
    const favoritePlaces = allPlaces.items.filter(p => favorites.includes(p.id));
    return ok(c, favoritePlaces);
  });
  // REVIEWS
  app.get('/api/places/:id/reviews', async (c) => {
    const { items } = await ReviewEntity.list(c.env);
    return ok(c, items.filter(r => r.placeId === c.req.param('id')));
  });
  app.post('/api/places/:id/reviews', async (c) => {
    const placeId = c.req.param('id');
    const reviewData = await c.req.json() as any;
    const review = await ReviewEntity.create(c.env, {
      ...reviewData,
      id: crypto.randomUUID(),
      placeId,
      timestamp: Date.now()
    });
    return ok(c, review);
  });
}