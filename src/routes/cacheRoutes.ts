import { Router } from "express";
import { setKey, getKey, deleteKey, listKeys, getStats, clearCache } from "../controllers/cacheController";

const router = Router();

router.post('/set', setKey);
router.get('/get/:key', getKey);
router.delete('/delete/:key', deleteKey);
router.get('/keys', listKeys);
router.get('/stats', getStats);
router.get('/clear', clearCache);

export default router;