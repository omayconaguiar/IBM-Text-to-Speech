import { Request, Response, NextFunction } from 'express';
import Ajv from 'ajv';
import { Container } from 'typedi';

const ajv = Ajv({ allErrors: true, removeAdditional: 'all', nullable: true });

function errorResponse(schemaErrors: Ajv.ErrorObject[]) {
  const errors = schemaErrors.map((error: any) => {
    return {
      path: error.dataPath,
      message: error.message,
      params: error.params,
    };
  });
  return {
    status: 'failed',
    errors,
  };
}

const validateInput = (schemaName: string) => {
  const logger = Container.get('logger');
  const InputSchema = Container.get(schemaName);
  if (!ajv.getSchema(schemaName)) {
    // @ts-ignore
    ajv.addSchema(InputSchema, schemaName);
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajv.validate(schemaName, {
      ...req.params,
      ...req.query,
      ...req.body,
      ...req.headers,
    });
    if (!valid) {
      // @ts-ignore
      logger.debug(
        `${'Error validating ' + '"'}${schemaName}"` + ': %o\n%o',
        ajv.errors,
        {
          params: req.params,
          query: req.query,
          body: req.body,
          headers: req.headers,
        },
      );
      return res.status(422).send(errorResponse(ajv.errors));
    }
    next();
  };
};

export default validateInput;
