# Cinevora Backend API

Production-ready REST API for the Cinevora movie streaming and discovery platform.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT (admin only)
- **Security:** Helmet, CORS, express-rate-limit, bcryptjs

---

## Requirements

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm >= 9.x

---

## Installation

```bash
cd backend
npm install
```

---

## PostgreSQL Setup

```sql
CREATE DATABASE cinevora;
```

Or using psql:
```bash
psql -U postgres -c "CREATE DATABASE cinevora;"
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/cinevora
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
BCRYPT_ROUNDS=12
```

---

## Prisma Migration

```bash
npm run prisma:generate
npm run prisma:migrate
```

---

## Database Seeding

```bash
npm run prisma:seed
```

This creates:
- 1 admin account
- 10 genres
- 20 cast members
- 30 movies
- 15 TV series with seasons and episodes
- 5 banners

**Default Admin Credentials:**
- Email: `admin@cinevora.com`
- Password: `admin123456`

---

## Development

```bash
npm run dev
```

Server runs at: `http://localhost:5000`

---

## Production

```bash
npm start
```

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /health
```

---

### Movies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | List all movies (paginated, filterable) |
| GET | `/api/movies/trending` | Trending movies |
| GET | `/api/movies/popular` | Popular movies |
| GET | `/api/movies/featured` | Featured movies |
| GET | `/api/movies/:id` | Movie by ID |
| GET | `/api/movies/slug/:slug` | Movie by slug |
| GET | `/api/movies/:id/cast` | Movie cast |
| GET | `/api/movies/:id/recommendations` | Recommendations |

**Query Parameters for `/api/movies`:**
```
page, limit, search, genre, year, rating, language, country, sort, featured, trending, popular
```

**Sort options:** `rating`, `latest`, `views`, `az`, `za`, `newest`

---

### Series

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/series` | List all series |
| GET | `/api/series/trending` | Trending series |
| GET | `/api/series/popular` | Popular series |
| GET | `/api/series/:id` | Series by ID |
| GET | `/api/series/slug/:slug` | Series by slug |
| GET | `/api/series/:id/seasons` | Series seasons with episodes |
| GET | `/api/series/:id/recommendations` | Recommendations |

---

### Episodes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/seasons/:seasonId/episodes` | Episodes by season |
| GET | `/api/episodes/:id` | Episode by ID |

---

### Genres

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/genres` | All genres |
| GET | `/api/genres/:slug` | Genre by slug |
| GET | `/api/genres/:slug/movies` | Movies by genre |

---

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search?q=term` | Search movies and series |

---

### Watch (No Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/watch/movie/:id` | Watch movie (increments views) |
| POST | `/api/watch/episode/:id` | Watch episode (increments views) |

**Request body (optional):**
```json
{ "sessionId": "anonymous-session-id", "watchDuration": 120 }
```

---

### Banners

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/banners` | Active banners |

---

### Cast

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cast` | All cast members |
| GET | `/api/cast/:id` | Cast member by ID |

---

### Admin (JWT Required)

**Login:**
```
POST /api/admin/login
Body: { "email": "admin@cinevora.com", "password": "admin123456" }
```

**Use token in header:**
```
Authorization: Bearer <token>
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/profile` | Admin profile |
| POST | `/api/admin/movies` | Create movie |
| PUT | `/api/admin/movies/:id` | Update movie |
| DELETE | `/api/admin/movies/:id` | Delete movie |
| POST | `/api/admin/series` | Create series |
| PUT | `/api/admin/series/:id` | Update series |
| DELETE | `/api/admin/series/:id` | Delete series |
| POST | `/api/admin/seasons` | Create season |
| PUT | `/api/admin/seasons/:id` | Update season |
| DELETE | `/api/admin/seasons/:id` | Delete season |
| POST | `/api/admin/episodes` | Create episode |
| PUT | `/api/admin/episodes/:id` | Update episode |
| DELETE | `/api/admin/episodes/:id` | Delete episode |
| POST | `/api/admin/genres` | Create genre |
| PUT | `/api/admin/genres/:id` | Update genre |
| DELETE | `/api/admin/genres/:id` | Delete genre |
| POST | `/api/admin/cast` | Create cast member |
| PUT | `/api/admin/cast/:id` | Update cast member |
| DELETE | `/api/admin/cast/:id` | Delete cast member |
| POST | `/api/admin/banners` | Create banner |
| PUT | `/api/admin/banners/:id` | Update banner |
| DELETE | `/api/admin/banners/:id` | Delete banner |
| GET | `/api/admin/analytics` | Dashboard analytics |

---

## API Response Format

**Success:**
```json
{
  "success": true,
  "message": "Movies fetched successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Movie not found",
  "error": "MOVIE_NOT_FOUND"
}
```

---

## Frontend Connection

Set your frontend API base URL to:
```
http://localhost:5000/api
```

CORS is enabled for `http://localhost:3000` and `http://localhost:3001`.

---

## NPM Scripts

```bash
npm run dev           # Start dev server with nodemon
npm start             # Start production server
npm run prisma:migrate   # Run database migrations
npm run prisma:generate  # Generate Prisma client
npm run prisma:seed      # Seed database with demo data
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:reset     # Reset database (WARNING: deletes all data)
```
