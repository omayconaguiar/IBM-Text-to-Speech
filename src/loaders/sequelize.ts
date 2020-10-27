import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import config from '../../src/config';
//var mysql2 = require('mysql2');

/* 
    Solution to prevent pg from updating datetime to local time zone
    https://github.com/sequelize/sequelize/issues/854#issuecomment-491942457 */

//mysql2.types.setTypeParser(1082, 'text', function (text) { return text; });
//mysql2.types.setTypeParser(1184, 'text', function (text) { return text; });
//mysql2.types.setTypeParser(1114, 'text', function (text) { return text; });

const sequelize = new Sequelize({
    database: config.database.name,
    dialect: 'mysql',
    username: config.database.username,
    password: config.database.password,
    logging: console.log,
    models: [path.join(__dirname, '../models')],
    timezone: '+00:00',
    host: config.database.host,
    port: parseInt(config.database.port.toString())
});

export default sequelize;