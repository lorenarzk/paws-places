import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, PlaceEntity, ReviewEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
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