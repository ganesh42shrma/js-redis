Welcome to **Phase 1: Foundations — Setting up Node + TypeScript** 🔧

This phase sets the **base for your Mini Redis project**, and by the end, you’ll have a clean, type-safe backend running with one test route (`/ping`).
We’ll go slowly and explain *why* we’re doing each step — since this is also a learning exercise.

---

## 🧱 Goal of Phase 1

✅ Set up a **Node.js + TypeScript** backend project
✅ Add **Express** for API routes
✅ Configure **ts-node**, **nodemon**, and **dotenv** for smooth development
✅ Test with a `/ping` route
✅ Understand how TypeScript compiles and runs in Node

---

## 📁 Step 1: Create a New Project Folder

```bash
mkdir mini-redis
cd mini-redis
```

---

## 🪄 Step 2: Initialize `package.json`

```bash
npm init -y
```

This creates a basic Node project with default settings.

---

## ⚙️ Step 3: Install Dependencies

Install these core libraries:

```bash
npm install express dotenv
```

And TypeScript-related dev dependencies:

```bash
npm install -D typescript ts-node nodemon @types/express @types/node
```

**Explanation:**

* `express` → our web server
* `dotenv` → for environment variables
* `typescript` → compiler for TS → JS
* `ts-node` → allows running TS directly
* `nodemon` → auto-restarts server on file change
* `@types/...` → TypeScript definitions for type safety

---

## 🧩 Step 4: Initialize TypeScript

```bash
npx tsc --init
```

This creates a `tsconfig.json`.
Now, open it and make sure these options are set:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true
  }
}
```

**Learning Note 🧠:**

* `rootDir` → where your TS code lives
* `outDir` → compiled JS output folder
* `esModuleInterop` → allows `import express from 'express'` syntax
* `strict` → enforces best practices and catches bugs early

---

## 🪶 Step 5: Project Structure

Create this folder layout:

```
mini-redis/
├── src/
│   ├── server.ts
│   └── config/
│       └── env.ts
├── .env
├── package.json
├── tsconfig.json
```

---

## 🌿 Step 6: Setup Environment Config

In `.env`:

```env
PORT=3000
```

In `src/config/env.ts`:

```ts
import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
```

---

## 🚀 Step 7: Basic Express Server

In `src/server.ts`:

```ts
import express, { Request, Response } from "express";
import { PORT } from "./config/env";

const app = express();

app.use(express.json());

// test route
app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong 🏓" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

## 🧰 Step 8: Add Scripts to `package.json`

In your `package.json`, add these lines under `"scripts"`:

```json
"scripts": {
  "dev": "nodemon src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

Now you can run:

```bash
npm run dev
```

✅ Expected Output:

```
🚀 Server running on http://localhost:3000
```

and visiting [http://localhost:3000/ping](http://localhost:3000/ping) should show:

```json
{ "message": "pong 🏓" }
```

---

## 🧠 Learning Notes

* **TypeScript in Node.js:**
  Node can’t read `.ts` files natively. We use `ts-node` during dev (to run directly), and `tsc` to compile for production.

* **Event Loop Concept:**
  Even though Node is “single-threaded,” it uses the event loop to handle many requests efficiently without blocking.

* **Nodemon Advantage:**
  Watches file changes → auto restarts → smooth dev experience.

---

## ✅ Phase 1 Checkpoint

You now have:

* A working Express server in TypeScript
* Proper dev + prod scripts
* `.env` config system
* Verified endpoint

---