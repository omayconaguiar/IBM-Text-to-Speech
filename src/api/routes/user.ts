import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IUser } from '../../interfaces/IUser';
import comment from '../../services/user';
import middlewares from '../middlewares';
import config from '../../database';

const route = Router();

export default (app: Router) => {
  app.use(config.api.user.root, route);
  route.post(
    '/',
    middlewares.validateInput('createCallSchema'),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger');
      // @ts-ignore
      logger.debug('Calling POST /user: with: %o', {
        params: req.params,
        headers: req.headers,
        query: req.query,
        body: req.body,
      });
      try {
        const communicationServiceInstance = Container.get(comment);
        const communicationRequest: IUser = {
          ...req.query,
          ...req.body,
        };
        const response = await communicationServiceInstance.createCall(
          communicationRequest,
        );
        res.status(200).json(response);
      } catch (e) {
        // @ts-ignore
        logger.error('🔥 Error calling POST /user: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger');
      // @ts-ignore
      logger.debug('Calling GET /user: with: %o', {
        params: req.params,
        headers: req.headers,
        query: req.query,
        body: req.body,
      });
      try {
        const communicationServiceInstance = Container.get(comment);
        const communicationRequest: IUser = {
          ...req.query,
          ...req.body,
        };
        const response = await communicationServiceInstance.getCall(
          communicationRequest,
        );
        res.status(200).json(response);
      } catch (e) {
        // @ts-ignore
        logger.error('🔥 Error calling GET /user: %o', e);
        return next(e);
      }
    },
  );
};
