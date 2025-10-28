export const CACHE_CONFIG = {
    MAX_SIZE: parseInt(process.env.CACHE_MAX_SIZE || "100", 10),
    CLEANUP_INTERVAL_MS: parseInt(process.env.CLEANUP_INTERVAL_MS || "60000", 10),
    PERSISTENCE_FILE_PATH: process.env.CACHE_FILE_PATH || "data/cache.json",
    PERSIST_INTERVAL_MS: parseInt(process.env.CACHE_PERSIST_INTERVAL_MS || "10000", 10),
};