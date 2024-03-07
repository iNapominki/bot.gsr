require("dotenv").config();
const Bot = require("./src/bot/Bot");
const LoggerManager = require("./src/log/LoggerManager");
const RegisrtationCommand = require("./src/commands/Regisrtation.command");
const HelpCommand = require("./src/commands/Help.command");
const OrderCommand = require("./src/commands/Order.command");
const FormCommand = require("./src/commands/Form.command");
const Command = require("./src/commands/command.class");

const token = process.env.TELEGRAMM_TOKEN;

const bot = new Bot(token);
try {
  bot.start();
  const loggerManager = new LoggerManager();

  const registration = new RegisrtationCommand(bot.bot);
  const help = new HelpCommand(bot.bot);
  const order = new OrderCommand(bot.bot);
  const form = new FormCommand(bot.bot);

  help.handle();
  registration.handle();
  order.handle();
  form.handle();

  loggerManager.logMessage("log", "старт", "Произошел старт бота");
  // Пример обработки ошибки

  // Код, который может вызвать ошибку
  //throw new Error('Example error');
} catch (error) {
  new LoggerManager().logMessage("error", "error", error.message);
  console.log(error);

  const erronRequest = new Command(bot.bot);
  erronRequest.requestMessage(JSON.stringify(error));
 
}
