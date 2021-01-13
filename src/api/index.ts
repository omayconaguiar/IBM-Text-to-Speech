import { Router } from 'express';
import comment from './routes/comment';
import page from './routes/page';

export default () => {
    const app = Router();
    comment(app);
    page(app)
    return app;
}