import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const configs = {
    PORT: parseInt(process.env.PORT, 10) || 3000,
    LOG_LEVEL: process.env.LOG_LEVEL || 'silly',
    DB_NAME: process.env.DB_NAME || 'test',
    DB_USERNAME: process.env.DB_USERNAME || 'test',
    DB_PASSWORD: process.env.DB_PASSWORD || '12345678',
    DB_HOSTNAME: process.env.DB_HOSTNAME || 'localhost',
    DB_PORT: process.env.DB_PORT || 3306,
    API_KEY: process.env.API_KEY,
    URL: process.env.URL
};

var not_configured = [];

Object.keys(configs).map((c) => {
    if (!configs[c]) {
        not_configured.push(c);
    }
});

if (not_configured.length) {
    throw new Error('List of required environment variables not configured: ' + not_configured.toString());
}

export default {
    port: parseInt(process.env.PORT, 10) || 3000,

    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    api: {
        comment: {
            root: '/comment',
        },
        page: {
            root: ''
        },

    },


    ibm: {
        apikey: process.env.API_KEY,
        url: process.env.URL
    },


    database: {
        name: process.env.DB_NAME || 'test',
        username: process.env.DB_USERNAME || 'test',
        password: process.env.DB_PASSWORD || '12345678',
        host: process.env.DB_HOSTNAME || 'localhost',
        port: process.env.DB_PORT || 3306
    },
};