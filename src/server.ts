import express, { Request, Response } from 'express';
import cacheRoutes from './routes/cacheRoutes';
import { notFoundHandler } from './middleware/notFoundHandler';
import { errorHandler } from './middleware/errorHandler';
import { PORT } from './config/env';

const app = express();

app.use(express.json());

//test route
app.get('/ping', (req: Request, res: Response) => {
    res.json({ message: "pong" });
});

app.use('/', cacheRoutes);
app.use(notFoundHandler); //
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})