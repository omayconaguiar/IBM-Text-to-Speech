import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IComment } from '../../interfaces/IComment';
import comment from '../../services/comment';
import middlewares from '../middlewares';
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
import config from '../../config';
import path from 'path';
const route = Router();

export default (app: Router) => {
    app.use(config.api.page.root, route);
    route.get('/',
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            // @ts-ignore
            logger.debug('Calling GET /: with: %o', {
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
                logger.error('🔥 Error calling GET /: %o', e);
                return next(e);
            }
        });

    route.get('/page/:id',
        middlewares.validateInput('getByIdSchema'),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            // @ts-ignore
            logger.debug('Calling GET /comment/:id: with: %o', {
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
                logger.error('🔥 Error calling GET /comment/:id: %o', e);
                return next(e);
            }

        });

}