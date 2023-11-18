const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname, '../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});
const development = {
    name: 'development',
    db: process.env.MONGODB_URL,
    port: process.env.PORT,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
}

const production = {
    name: 'production',
    db: process.env.MONGODB_URL,
    port: process.env.PORT,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
}

module.exports = eval(process.env.ECOMMERCEAPI_ENVIRONMENT) == undefined ? development : eval(process.env.ECOMMERCEAPI_ENVIRONMENT);