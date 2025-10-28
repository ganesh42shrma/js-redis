import dotenv from 'dotenv';

dotenv.config();

export const PORT=process.env.PORT || 3000;
export const MAX_SIZE=200;
export const CLEANUP_INTERVAL_MS=60000;
export const CACHE_FILE_PATH='data/cache.json';