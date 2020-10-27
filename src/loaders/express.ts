import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../../src/api';
import config from '../../src/config';
import { Request, Response, NextFunction } from 'express';

interface ResponseError extends Error {
    status?: number;
    code?: number;
}

export default async ({ app }: { app: express.Application }) => {
    app.use(cors());

    app.use(bodyParser.json());

    app.use(config.api.root, routes());

    app.use((req: Request, res: Response, next: NextFunction) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });

    app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500);
        if (!err.status || err.status === 500) {
            res.json({
                errors: {
                    message: "Internal server error."
                }
            });
        } else {
            res.json({
                error: {
                    message: err.message,
                    code: err.code
                }
            });
        }
    });
};