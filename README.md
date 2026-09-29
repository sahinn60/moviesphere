# 🎬 MovieSphere

**Your Universe of Movies** — A complete modern movie streaming & discovery platform.

## 📁 Project Structure

```
moviesphere/
├── frontend (React + Vite)     ← This folder is the frontend
├── backend/                    ← Node.js + Express + PostgreSQL API
│   ├── prisma/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── src/                        ← Frontend source
├── package.json                ← Frontend package
└── README.md
```

---

## 🚀 Frontend (React + Vite)

### Run Frontend
```bash
npm install
npm run dev
```
Opens at: **http://localhost:5173**

### Features
- 🏠 Home with cinematic hero banner
- 🎬 30 Movies with details & video player
- 📺 15 TV Series with episodes
- 🔍 Search & filter
- 🎭 Genre pages
- 🔥 Trending & Popular
- 🔖 Watchlist (localStorage)
- 📱 Fully responsive
- 🔐 No login required

---

## ⚙️ Backend (Node.js + Express + PostgreSQL)

### Tech Stack
- Node.js + Express.js
- PostgreSQL + Prisma ORM
- JWT (admin only)
- Helmet, CORS, Rate Limiting

### Setup Backend
```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and fill in:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/cinevora
JWT_SECRET=your_secret_key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

API runs at: **http://localhost:5000**

### Admin Credentials (after seed)
- Email: `admin@cinevora.com`
- Password: `admin123456`

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | All movies |
| GET | `/api/movies/trending` | Trending |
| GET | `/api/movies/popular` | Popular |
| GET | `/api/series` | All series |
| GET | `/api/genres` | All genres |
| GET | `/api/search?q=term` | Search |
| GET | `/api/banners` | Banners |
| POST | `/api/watch/movie/:id` | Watch movie |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/analytics` | Dashboard stats |

---

## 🌐 Live Demo
Frontend: [MovieSphere on Vercel](https://moviesphere.vercel.app)

---

## 📄 License
MIT License — Free to use for educational purposes.
