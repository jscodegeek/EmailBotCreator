const config = require('config');
const winston = require('winston');
const Guid = require('guid');

const appInstanceId = Guid.raw();

const logPath = config.get('logs.filePath');
const logger = new (winston.Logger)({
    transports: [
    new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: logPath })
    ]
});

logger.info(`EmailBotCreator started, instanceId: ${appInstanceId} `);
