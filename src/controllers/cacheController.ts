import { Request, Response, NextFunction } from "express";
import { Cache } from "../cache/Cache";

const cache = new Cache(); // Single cache instance

// --- Helper to throw errors with custom status codes ---
const createError = (message: string, statusCode = 400) => {
  const err = new Error(message) as any;
  err.statusCode = statusCode;
  return err;
};

// ---------------- Controllers ----------------

// POST /set
export const setKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key, value, ttl } = req.body;

    // Validate inputs first
    if (!key || value === undefined) {
      throw createError("Key and value are required.", 400);
    }

    // Validate & convert TTL if provided
    const ttlNum = ttl !== undefined && ttl !== null ? Number(ttl) : undefined;
    if (ttlNum !== undefined && isNaN(ttlNum)) {
      throw createError("TTL must be a valid number (in milliseconds).", 400);
    }

    // Set key in cache
    cache.set(key, value, ttlNum);

    // Respond
    res.json({
      message: `Key '${key}' set successfully.`,
      value,
      ttl: ttlNum ? `${ttlNum} ms` : "No TTL",
    });
  } catch (err) {
    next(err);
  }
};


// GET /get/:key
export const getKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = req.params.key;
    const value = cache.get(key);

    if (value === null) {
      throw createError(`Key '${key}' not found.`, 404);
    }

    res.json({ key, value });
  } catch (err) {
    next(err);
  }
};

// DELETE /delete/:key
export const deleteKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = req.params.key;
    const success = cache.delete(key);

    if (!success) {
      throw createError(`Key '${key}' not found.`, 404);
    }

    res.json({ message: `Key '${key}' deleted successfully.` });
  } catch (err) {
    next(err);
  }
};

// GET /keys
export const listKeys = (req: Request, res: Response, next: NextFunction) => {
  try {
    const keys = cache.keys();
    res.json({ keys });
  } catch (err) {
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
