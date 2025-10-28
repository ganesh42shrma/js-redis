//src/cache/Cache.ts

export class Cache { // typescript class cache , export means we can import it in other files
    private store: Map<string, any>; //property named store, private means only accessible within this class , other parts of code cannot directly access it 
    private ttlMap: Map<string, number>; //map to store time to live values for each key
    private maxSize: number;
    private cleanUpIntervalMs: number;
    private cleanUpInterval: NodeJS.Timeout;

    constructor(maxSize: number = 100, cleanUpIntervalMs: number = 60000) { // the constuctor method is automatically called when an instance of this class is created , this created a new Map object to hold our key-value pairs
        this.store = new Map(); //store is a js map object 
        this.ttlMap = new Map(); //initialize ttlMap as a new map
        this.maxSize = maxSize; // set the max size of the cache
        this.cleanUpIntervalMs = cleanUpIntervalMs;

        // Periodic cleanup of expired keys
        this.cleanUpInterval = setInterval(
            () => this.cleanupExpiredKeys(),
            this.cleanUpIntervalMs
        );
    }

    set(key: string, value: any, ttl?: number): void {  // method named set, takes a key of type string and a value of any type , returns nothing(void)
        if (this.store.size >= this.maxSize) this.evictLRU(); // check if the current size of the store has reached the max size, if so evict the least recently used item
        this.store.set(key, value) // uses the set method of javascript map to store the key-value pair
        if (ttl) this.ttlMap.set(key, Date.now() + ttl); // if a ttl is provided, calculate the expiration time by adding the current time to the ttl value and store it in the ttlMap
        else this.ttlMap.delete(key);
    }

    get(key: string): any | null {
        if (this.isExpired(key)) {
            this.delete(key);
            return null;
        }
        const value = this.store.get(key);
        if (value !== undefined) {
            //refresh LRU by re-inserting the key-value pair
            const v = this.store.get(key);
            this.store.delete(key);
            this.store.set(key, v);
        }
        return value ?? null; //retreives the value associcated with the provided key using the get method of js map, and refreshes its position for LRU, if the key does not exist returns null
    }

    delete(key: string): boolean {
        this.ttlMap.delete(key); // first removes any ttl associated with the key from the ttlMap
        return this.store.delete(key); // uses the delete method of js map to remove key-value pair associated with the provided key, returns true if the key existed and was deleted,false otherwise
    }

    keys(): string[] {
        return Array.from(this.store.keys()) // retrieves all keys from the map using keys method, converts the iterable to an array using Array.from and returns it
    }

    stats() {
        const now = Date.now();
        const activeKeys = Array.from(this.ttlMap.entries())
            .filter(([_, expiry]) => expiry > now).length;

        return {
            totalKeys: this.store.size,
            keysWithTTL: activeKeys,
            maxSize: this.maxSize,
        };
    }


    clear() {
        clearInterval(this.cleanUpInterval);
    }

    private isExpired(key: string): boolean {
        const expiry = this.ttlMap.get(key);
        return expiry ? Date.now() > expiry : false;
    }

    private evictLRU() {
        const oldestKey = this.store.keys().next().value;
        if (oldestKey !== undefined) {
            console.log(`🧹 Evicted oldest key: ${oldestKey}`);
            this.delete(oldestKey);
        }
    }

    private cleanupExpiredKeys() {
        for (const key of this.ttlMap.keys()) {
            if (this.isExpired(key)) this.delete(key);
        }
    }
}