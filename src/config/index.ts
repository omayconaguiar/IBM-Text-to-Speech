import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    port: parseInt(process.env.PORT, 10) || 3000,

    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    api: {
        root: '/comment'
    },


    database: {
        name: process.env.DB_NAME || 'test',
        username: process.env.DB_USERNAME || 'test',
        password: process.env.DB_PASSWORD || '12345678',
        host: process.env.DB_HOSTNAME || 'localhost',
        port: process.env.DB_PORT || 3306
    },

    PaymentsApi: {
        username: process.env.USERNAME_ZOOP,
        password: '',
        host: 'https://api.zoop.ws/v1/marketplaces/',
        endpoints: {
            createClient: process.env.MARKET_PLACE_ID + '/buyers'
        }
    }

};