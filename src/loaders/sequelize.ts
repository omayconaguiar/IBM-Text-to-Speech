import { Sequelize } from 'sequelize-typescript';
import path from 'path';

/*
    Solution to prevent pg from updating datetime to local time zone
    https://github.com/sequelize/sequelize/issues/854#issuecomment-491942457 */

// mysql2.types.setTypeParser(1082, 'text', function (text) { return text; });
// mysql2.types.setTypeParser(1184, 'text', function (text) { return text; });
// mysql2.types.setTypeParser(1114, 'text', function (text) { return text; });

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'api',
  dialect: 'postgres',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  logging: console.log,
  models: [path.join(__dirname, '../models')],
  timezone: '+00:00',
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT, 10) || 5432,
});

export default sequelize;
