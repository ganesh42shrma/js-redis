# 🧠 Mini Redis — A Custom In-Memory Caching Layer (JS Edition)

### ⚡ Built with TypeScript, Node.js, and Express

## 🚀 Overview

**Mini Redis** is a learning-driven project inspired by the architecture and features of **Redis**, designed to help understand how caching systems work under the hood.

It simulates the behavior of a real in-memory data store — supporting **basic CRUD operations**, **TTL (Time-to-Live)** for key expiry, and an **Express API interface** to interact with the cache.

The project is written in **TypeScript**, structured using **MVC principles**, and includes a custom **error-handling middleware** for clean and reliable API behavior.

## 🎯 Goals

The purpose of this project is **educational** — to build and deeply understand the inner workings of caching systems while strengthening concepts of:

- **Memory management** and ephemeral data storage  
- **TTL (key expiry)** and cleanup mechanisms  
- **System design principles** and modular architecture  
- **Express.js middleware, routing, and error handling**  
- **TypeScript for backend applications**  
- **Scalable code structure (MVC pattern)**

Ultimately, this serves as a foundation for future phases like **Pub/Sub**, **LRU eviction**, and **WebSocket-based dashboards**.

## 🧩 Current Features (Phase 1–4)

✅ **Core Cache Implementation**
- Stores key-value pairs in memory using a `Map`
- Provides methods for `set`, `get`, `delete`, and `keys`
- Basic LRU refresh on reads (re-inserts key to keep it recent)

✅ **REST API Endpoints**
- `POST /set` – Set a key-value pair (with optional TTL in ms)
- `GET /get/:key` – Retrieve a value by key
- `DELETE /delete/:key` – Delete a key
- `GET /keys` – Fetch all active keys in memory

✅ **TTL (Time-to-Live) Support**
- Keys automatically expire after the specified duration
- Expired keys are cleaned up periodically

✅ **Persistence (Phase 4)**
- Cache can be persisted to disk as JSON (`src/cache/CachePersistence.ts`)
- Auto-persistence runs on a configurable interval and on graceful shutdown
- Persistence file path and interval are configurable via environment variables

✅ **Centralized Error Handling**
- Custom `createError()` helper
- Global `errorHandler` middleware with status codes and messages

✅ **Clean MVC / modular Architecture**
- `controllers/` – Route logic
- `routes/` – Express routes
- `cache/` – Cache class and persistence logic
- `middleware/` – Error handling
- `server.ts` – Express app entry point

## 🧱 Project Structure

```
mini-redis/
├── src/
│   ├── server.ts
│   ├── routes/
│   │   └── cacheRoutes.ts
│   ├── controllers/
│   │   └── cacheController.ts
│   ├── cache/
│   │   ├── Cache.ts
│   │   └── CachePersistence.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── notFoundHandler.ts
│   └── config/
│       └── config.ts
├── data/              # default location for persisted cache JSON
├── package.json
├── tsconfig.json
└── README.md
```

## ⚙️ Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/mini-redis.git
cd mini-redis
```

2. Install dependencies
```bash
npm install
```

3. Environment variables (optional)
- CACHE_MAX_SIZE — maximum number of keys (default: 100)
- CLEANUP_INTERVAL_MS — TTL cleanup interval in ms (default: 60000)
- CACHE_FILE_PATH — path to persistence file (default: data/cache.json)
- CACHE_PERSIST_INTERVAL_MS — persist interval in ms (default: 10000)

You can create a .env file or set these in your environment.

4. Run the development server
```bash
npm run dev
```

5. Test using Postman or cURL

Example:
```bash
# Set a key with TTL of 5000ms
curl -X POST http://localhost:3000/set -H "Content-Type: application/json" -d '{"key":"username","value":"Ganesh","ttl":5000}'
```

## 🧠 Persistence details
- On startup the cache attempts to load persisted JSON (if present) and restore entries.
- Auto-persistence periodically writes the in-memory store to disk.
- The server triggers a final persist on graceful shutdown (SIGINT).
- Persistence currently saves the raw stored values (no metadata like TTL expiry timestamps are preserved beyond what the stored objects include).

## 🧠 Learning Notes

Throughout this project, you’ll learn:

- How caching improves performance in real-world systems
- How to manage memory and avoid leaks
- How TTL and cleanup mechanisms are implemented internally
- How to design maintainable, modular backend architecture
- How to progressively evolve a simple app into a system-design-ready backend

## 🔮 Upcoming Phases

These will be built on top of the existing cache:

- 🔁 Phase 5 – LRU / LFU eviction policies (improved eviction)
- 📡 Phase 6 – Pub/Sub mechanism
- 💻 Phase 7 – WebSocket-based live dashboard
- 🧩 Phase 8 – Distributed caching and clustering

## 🧑‍💻 Author

**Ganesh Channakrishnam Sharma**  
Computer Science Graduate | Full-Stack Developer  
📍 Bengaluru, India

## 🪄 License

This project is open-source and available under the [MIT License](LICENSE).

---

⭐ If you like this project, consider starring it on GitHub!
It helps motivate the continuation of future phases and feature development.
