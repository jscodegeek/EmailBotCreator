const config = require('config');
const winston = require('winston');
const Guid = require('guid');

const Chance = require('chance');
const chance = new Chance();

const {Builder, By, Key, until,} = require('selenium-webdriver');
const proxy = require('selenium-webdriver/proxy');

const appInstanceId = Guid.raw();

const logPath = config.get('logs.filePath');
const logger = new (winston.Logger)({
    transports: [
    new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: logPath })
    ]
});

logger.info(`EmailBotCreator started, instanceId: ${appInstanceId}`);

const proxyOptions = proxy.manual({
  https : chance.pickone(config.get('proxy.https'))
}); 

(async function example() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .setProxy(proxyOptions)
    .build();
  logger.info(driver);
  try {
    await driver.get('https://account.mail.ru/signup');
    await driver.wait(until.titleIs('webdriver - Google Search'), 100000000);
  } finally {
    await driver.quit();
  }
})();
