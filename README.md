# Paws and Places

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)] [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/lorenarzk/paws-places)

A full-stack real-time chat application powered by Cloudflare Workers and Durable Objects. Features user management, chat boards with persistent messages, indexed listings, and a responsive React frontend built with modern tools.

## ✨ Features

- **Real-time Chat Boards**: Create chats, send messages, and list with pagination
- **User Management**: CRUD operations for users with automatic seeding
- **Durable Objects Storage**: Entity-based persistence (one DO per user/chat) with indexes for efficient listing
- **Type-Safe API**: Shared types between frontend and worker, Hono routing
- **Modern UI**: Shadcn UI components, Tailwind CSS, dark mode, animations
- **React Query Integration**: Optimistic updates, infinite queries, error handling
- **Production-Ready**: CORS, logging, error boundaries, client error reporting
- **Mobile-Responsive**: Sidebar layout, theme toggle, smooth animations

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 18, Vite, TypeScript, TanStack Query, React Router, Shadcn UI, Tailwind CSS, Lucide Icons, Sonner (Toasts), Framer Motion |
| **Backend** | Cloudflare Workers, Hono, Durable Objects, Cloudflare Storage API |
| **Utilities** | Zod (validation), Immer (state), clsx/twMerge (styling), Bun (package manager) |
| **Dev Tools** | ESLint, TypeScript 5, Wrangler, Vitest (testing ready) |

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) installed
- [Cloudflare Account](https://dash.cloudflare.com/) with Workers enabled

### Installation
```bash
bun install
```

### Development
```bash
bun run dev
```
- Opens frontend at `http://localhost:3000` (or `${PORT:-3000}`)
- Worker API at `http://localhost:8787/api/*`
- Hot reload enabled

### Build for Production
```bash
bun run build
```
- Builds frontend assets and worker bundle

## 📚 Usage Examples

### API Endpoints
All endpoints under `/api/*`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/users` | List users (?cursor=&limit=) |
| `POST` | `/api/users` | Create user `{ name: string }` |
| `DELETE` | `/api/users/:id` | Delete user |
| `GET` | `/api/chats` | List chats (?cursor=&limit=) |
| `POST` | `/api/chats` | Create chat `{ title: string }` |
| `GET` | `/api/chats/:chatId/messages` | List messages |
| `POST` | `/api/chats/:chatId/messages` | Send message `{ userId: string, text: string }` |

Example with `curl`:
```bash
# Create user
curl -X POST http://localhost:8787/api/users -H "Content-Type: application/json" -d '{"name": "Alice"}'

# List chats
curl http://localhost:8787/api/chats
```

### Frontend Integration
Uses `api-client.ts` for type-safe fetches:
```tsx
import { api } from '@/lib/api-client'
// List users
const users = await api<{ items: User[]; next: string | null }>('/api/users')
```

## ☁️ Deployment

1. **Configure Wrangler** (optional):
   - Edit `wrangler.toml` for custom bindings/secrets
   - Run `bun run cf-typegen` to update types

2. **Deploy**:
   ```bash
   bun run deploy
   ```
   Deploys Worker + static assets to Cloudflare.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)] [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/lorenarzk/paws-places)

Your app will be live at `https://your-subdomain.workers.dev` with automatic SPA routing.

## 🧪 Testing & Linting
```bash
bun run lint
# Add tests in `src/` and `worker/` with Vitest
```

## 🤝 Contributing
1. Fork & clone
2. `bun install`
3. `bun run dev`
4. Submit PR

**Do not modify** `worker/index.ts` or `worker/core-utils.ts` – extend via `worker/entities.ts` and `worker/user-routes.ts`.

## 📄 License
MIT – see [LICENSE](LICENSE) (or add one).