const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

export default {
  port: parseInt(process.env.PORT, 10) || 3000,

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  api: {
    user: {
      root: '/user',
    },
  },

  knexfile,
  knex,
};
