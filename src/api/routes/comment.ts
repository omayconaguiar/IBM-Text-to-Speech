import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IComment } from '../../interfaces/IComment';
import comment from '../../services/comment';
import middlewares from '../middlewares';
import config from '../../config';

const route = Router();

export default (app: Router) => {
    app.use(config.api.comment.root, route);
    route.post('/',
        middlewares.validateInput('createCommentSchema'),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            // @ts-ignore
            logger.debug('Calling POST /comment: with: %o', {
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
                const response = await communicationServiceInstance.createComment(communicationRequest);
                res.status(200).json(response);
            } catch (e) {
                // @ts-ignore
                logger.error('🔥 Error calling POST /comment: %o', e);
                return next(e);
            }

        });

    route.get('/',
        middlewares.validateInput('getAllSchema'),
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
                const response = await communicationServiceInstance.getAll(communicationRequest);
                res.status(200).json(response);
            } catch (e) {
                // @ts-ignore
                logger.error('🔥 Error calling GET /comment: %o', e);
                return next(e);
            }
        });

    route.patch('/:id',
        middlewares.validateInput('updateByIdSchema'),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            // @ts-ignore
            logger.debug('Calling PATCH /comment/:id: with: %o', {
                "params": req.params,
                "headers": req.headers,
                "query": req.query,
                "body": req.body
            });
            try {
                const communicationServiceInstance = Container.get(comment);
                const communicationRequest: IComment = {
                    ...req.query,
                    ...req.body,
                    ...req.params
                }
                const response = await communicationServiceInstance.updateById(communicationRequest);
                res.status(200).json(response);
            } catch (e) {
                // @ts-ignore
                logger.error('🔥 Error calling PATCH /comment/:id: %o', e);
                return next(e);
            }

        });

}