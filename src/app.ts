import express from 'express';
import config from './database';
import Logger from './loaders/logger';

const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

module.exports = knex;
async function startServer() {
  const app = express();
  knexfile;
  knexfile;

  await require('./loaders').default({ expressApp: app });

  app.listen(config.port || 5000, (err: any) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
            ################################################
            🛡️  Server listening on port: ${config.port} 🛡️ 
            ################################################
        `);
  });
}

startServer();
