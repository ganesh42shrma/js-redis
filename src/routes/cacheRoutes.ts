import { Router } from "express";
import { setKey, getKey, deleteKey, listKeys, getStats } from "../controllers/cacheController";

const router = Router();

router.post('/set', setKey);
router.get('/get/:key', getKey);
router.delete('/delete/:key', deleteKey);
router.get('/keys', listKeys);
router.get('/stats', getStats);

export default router;