require("dotenv").config();
const Bot = require('./src/bot/Bot');
const ErrorManager = require("./src/error/ErrorManager");
const RegisrtationCommand = require("./src/commands/Regisrtation.command");
const HelpCommand = require("./src/commands/Help.command");
const OrderCommand = require("./src/commands/Order.command");
const FormCommand = require("./src/commands/Form.command");

const token = process.env.TELEGRAMM_TOKEN;

const bot = new Bot(token);

bot.start();
const errorManager = new ErrorManager();

const registration = new RegisrtationCommand(bot.bot);
const help = new HelpCommand(bot.bot);
const order = new OrderCommand(bot.bot);
const form = new FormCommand(bot.bot);


help.handle();
registration.handle();
order.handle();
form.handle();


// Пример обработки ошибки
try {
    // Код, который может вызвать ошибку
    throw new Error('Example error');
  } catch (error) {
    errorManager.logError(error);
  }