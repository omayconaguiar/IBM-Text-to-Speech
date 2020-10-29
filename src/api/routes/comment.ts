import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IComment } from '../../interfaces/IComment';
import comment from '../../services/comment';
import middlewares from '../middlewares';
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
import config from '../../config';

const route = Router();

export default (app: Router) => {
    app.use(route);
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
                logger.error('🔥 Error calling POST /ddr3/comment: %o', e);
                return next(e);
            }

        });

    route.get('/',
        middlewares.validateInput('getAllSchema'),
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
                const response = await communicationServiceInstance.getAll(communicationRequest);
                res.status(200).json(response);
            } catch (e) {
                // @ts-ignore
                logger.error('🔥 Error calling POST /comment: %o', e);
                return next(e);
            }

        });

    route.get('/:id',
        middlewares.validateInput('getByIdSchema'),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            // @ts-ignore
            logger.debug('Calling POST /comment/:id: with: %o', {
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
                const response = await communicationServiceInstance.getById(communicationRequest);
                const textToSpeech = new TextToSpeechV1({
                    authenticator: new IamAuthenticator({
                        apikey: config.ibm.apikey,
                    }),
                    version: '5.7.1 ',
                    serviceUrl: config.ibm.url,
                });

                const synthesizeParams = {
                    text: `${response[0].text}`,
                    accept: 'audio/wav',
                    voice: 'pt-BR_IsabelaVoice',
                };

                var text = textToSpeech.synthesize(synthesizeParams)
                    .then(response => {
                        return textToSpeech.repairWavHeaderStream(response.result);
                    })
                    .then(buffer => {
                        res.set({
                            'Content-Disposition': 'attachment; filename=work.wav',
                            'Content-Type': 'audio/wav',
                        });

                        res.write(buffer);
                        res.end();
                    })
                    .catch(err => {
                        console.log('error:', err);
                    });
            } catch (e) {
                // @ts-ignore
                logger.error('🔥 Error calling POST /comment/:id: %o', e);
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