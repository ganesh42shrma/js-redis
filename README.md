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

Ultimately, this serves as a foundation for future phases like **Pub/Sub**, **Persistence**, **LRU eviction**, and **WebSocket-based dashboards**.

## 🧩 Current Features (Phase 1–3)

✅ **Core Cache Implementation**
- Stores key-value pairs in memory using a `Map`
- Provides methods for `set`, `get`, `delete`, and `keys`

✅ **REST API Endpoints**
- `POST /set` – Set a key-value pair (with optional TTL in ms)
- `GET /get/:key` – Retrieve a value by key
- `DELETE /delete/:key` – Delete a key
- `GET /keys` – Fetch all active keys in memory

✅ **TTL (Time-to-Live) Support**
- Keys automatically expire after the specified duration
- Expired keys are cleaned up periodically

✅ **Centralized Error Handling**
- Custom `createError()` helper
- Global `errorHandler` middleware with status codes and messages

✅ **Clean MVC Architecture**
- `controllers/` – Route logic
- `routes/` – Express routes
- `models/` – Cache class and data logic
- `middleware/` – Error handling
- `app.ts` – Express app entry point

## 🧱 Project Structure

```
mini-redis/
├── src/
│   ├── app.ts
│   ├── routes/
│   │   └── cacheRoutes.ts
│   ├── controllers/
│   │   └── cacheController.ts
│   ├── models/
│   │   └── Cache.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── createError.ts
│   └── types/
│       └── index.d.ts
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

3. Run the development server
```bash
npm run dev
```

4. Test using Postman or cURL

Example:
```bash
# Set a key with TTL of 5000ms
curl -X POST http://localhost:3000/set -H "Content-Type: application/json" -d '{"key":"username","value":"Ganesh","ttl":5000}'
```

## 🧠 Learning Notes

Throughout this project, you’ll learn:

- How caching improves performance in real-world systems
- How to manage memory and avoid leaks
- How TTL and cleanup mechanisms are implemented internally
- How to design maintainable, modular backend architecture
- How to progressively evolve a simple app into a system-design-ready backend

## 🔮 Upcoming Phases

These will be built on top of the existing cache:

- 🕸️ Phase 4 – Persistent storage (snapshotting to disk)
- 🔁 Phase 5 – LRU / LFU eviction policies
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
