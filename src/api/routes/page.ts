import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IComment } from '../../interfaces/IComment';
import comment from '../../services/comment';
import path from 'path';
import config from '../../config';

const route = Router();

export default (app: Router) => {
    app.use(config.api.page.root, route);
    route.get('/',
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            // @ts-ignore
            logger.debug('Calling GET /comment: with: %o', {
                "params": req.params,
                "headers": req.headers,
                "query": req.query,
                "body": req.body
            });
            try {
                const communicationServiceInstance = Container.get(comment);
                const communicationRequest: IComment = {
                    ...req.query,
                    ...req.body
                }
                const response = await communicationServiceInstance.getPage(communicationRequest);
                res.sendFile(path.resolve('src/public/index.html'))

            } catch (e) {
                // @ts-ignore
                logger.error('🔥 Error calling GET /comment: %o', e);
                return next(e);
            }
        });

}