import { Request, Response, NextFunction } from "express";
import { cacheInstance } from "../cache/cacheInstance";
import { createError } from "../middleware/createError";

const cache = cacheInstance;

// ---------------- Controllers ----------------

// POST /set
export const setKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("POST /set called with body:", req.body);
    const { key, value, ttl } = req.body ?? {};
    if (!key || value === undefined) {
      console.log("POST /set validation failed: missing key or value");
      return next(
        createError("Missing required fields: key and value", 400)
      );
    }
    if (ttl !== undefined && typeof ttl !== "number") {
      console.log("POST /set validation failed: ttl not a number", ttl);
      return next(
        createError("ttl must be a number (milliseconds)", 400)
      );
    }

    cacheInstance.set(String(key), value, ttl);
    console.log(`POST /set stored key='${key}' ttl=${ttl ?? "none"}`);
    return res.status(200).json({ ok: true, key });
  } catch (err) {
    console.error("POST /set error:", err);
    next(err);
  }
};

// GET /get/:key
export const getKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("GET /get/:key called with params:", req.params);
    const key = req.params.key;
    if (!key) {
      console.log("GET /get/:key validation failed: missing key param");
      return next(createError("Missing key parameter", 400));
    }

    const val = cacheInstance.get(key);
    if (val === null) {
      console.log(`GET /get/:key key='${key}' not found`);
      return next(createError(`Key '${key}' not found`, 404));
    }
    console.log(`GET /get/:key key='${key}' found`);
    return res.status(200).json({ key, value: val });
  } catch (err) {
    console.error("GET /get/:key error:", err);
    next(err);
  }
};

// DELETE /delete/:key
export const deleteKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("DELETE /delete/:key called with params:", req.params);
    const key = req.params.key;
    if (!key) {
      console.log("DELETE /delete/:key validation failed: missing key param");
      return next(createError("Missing key parameter", 400));
    }

    const existed = cacheInstance.delete(key);
    if (!existed) {
      console.log(`DELETE /delete/:key key='${key}' not found`);
      return next(createError(`Key '${key}' not found`, 404));
    }
    console.log(`DELETE /delete/:key key='${key}' deleted`);
    return res.status(200).json({ ok: true, key });
  } catch (err) {
    console.error("DELETE /delete/:key error:", err);
    next(err);
  }
};

// GET /keys
export const listKeys = (_req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("GET /keys called");
    const keys = cacheInstance.keys();
    console.log(`GET /keys returning ${keys.length} keys`);
    return res.status(200).json({ keys });
  } catch (err) {
    console.error("GET /keys error:", err);
    next(err);
  }
};

// GET /stats
export const getStats = (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = cache.stats();
    res.json({ stats });
  } catch (err) {
    next(err);
  }
};

// GET /clear
export const clearCache = (req: Request, res: Response, next: NextFunction) => {
  try {
    cache.clear();
    res.json({ message: "Cache cleared successfully." });
  } catch (err) {
    next(err);
  }
};
