//src/cache/Cache.ts

export class Cache { // typescript class cache , export means we can import it in other files
    private store: Map<string, any>; //property named store, private means only accessible within this class , other parts of code cannot directly access it 

    constructor() { // the constuctor method is automatically called when an instance of this class is created , this created a new Map object to hold our key-value pairs
        this.store = new Map(); //store is a js map object 
    }

    set(key: string, value: any): void {  // method named set, takes a key of type string and a value of any type , returns nothing(void)
        this.store.set(key, value) // uses the set method of javascript map to store the key-value pair
    }

    get(key: string): any | null {
        return this.store.has(key) ? this.store.get(key) : null; //checks if the key exists in the map using has method, if it does, retrieves the value using get method,if not returns null
    }

    delete(key: string): boolean {
        return this.store.delete(key); // uses the delete method of js map to remove key-value pair associated with the provided key, returns true if the key existed and was deleted,false otherwise
    }

    keys(): string[] {
        return Array.from(this.store.keys()) // retrieves all keys from the map using keys method, converts the iterable to an array using Array.from and returns it
    }

    stats() {
        return {
            totalKeys: this.store.size // returns the total number of key-value pairs currently stored in the cache using the size property of the map
        }
    }
}