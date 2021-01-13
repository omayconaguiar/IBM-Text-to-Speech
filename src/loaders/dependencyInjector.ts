import { Container } from 'typedi';
import LoggerInstance from './logger';

export default async ({ schemas }: { schemas?: { name: string; schema: any }[] }) => {
    try {
        schemas.forEach(s => {
            Container.set(s.name, s.schema);
        });
        Container.set('logger', LoggerInstance)
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};