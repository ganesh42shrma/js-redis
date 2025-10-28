import fs from 'fs';
import path from 'path';
import { CACHE_CONFIG } from '../config/config';

export class CachePersistence {
    private filePath: string;

    constructor() {
        this.filePath = path.resolve(CACHE_CONFIG.PERSISTENCE_FILE_PATH);
        this.ensureDirectory();
    }

    private ensureDirectory() {
        const dir = path.dirname(this.filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        };
    };

    save(data: Record<string, any>) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
            console.log(`Cache data was saved to ${this.filePath}`);
        } catch (err) {
            console.error(`Failed to save cache data to ${this.filePath}:`, err);
        }
    }

    load(): Record<string, any> {
        try {
            if (!fs.existsSync(this.filePath)) return {};
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            console.error(`❌ Failed to load cache: `, err);
            return {};
        }
    }
}