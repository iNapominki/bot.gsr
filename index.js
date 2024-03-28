require("dotenv").config();
const Bot = require("./src/bot/Bot");
const LoggerManager = require("./src/log/LoggerManager");
const RegisrtationCommand = require("./src/commands/Regisrtation.command");
const HelpCommand = require("./src/commands/Help.command");
const OrderCommand = require("./src/commands/Order.command");
const FormCommand = require("./src/commands/Form.command");
const Command = require("./src/commands/command.class");
const Buttoncommand = require("./src/commands/Button.command");
const ClearOrderCommand = require("./src/commands/ClearOrder.command");
const SessionServisPostOrder = require("./src/session/session.servisPostOrder");
const DataBase = require("./src/core/dataBase/dataBase");
const ChatsCommands = require("./src/commands/Chats.commands");
const GetMyChatsCommand = require("./src/commands/GetMyChats.command");
//const { createChat } = require("./src/core/chats/chat-controller");

const token = process.env.TELEGRAMM_TOKEN;

const bot = new Bot(token);
try {
  
  // запускаем 1 раз сервис который будет по очереди отправлять запрос в Google Sheets
  
  bot.start();
  const loggerManager = new LoggerManager();

  const registration = new RegisrtationCommand(bot.bot);
  const help = new HelpCommand(bot.bot);
  const order = new OrderCommand(bot.bot);
  const form = new FormCommand(bot.bot);
  const button = new  Buttoncommand(bot.bot);
  const clear = new ClearOrderCommand(bot.bot);
  const sessionServisPostOrder = new SessionServisPostOrder(bot.bot);
  // подключаем базу данных
  const batabase = new DataBase();
  // подключаем чаты менеджер - агент - куратор
  const chat = new ChatsCommands(bot.bot);
  // получить мои чаты
  const mychats = new GetMyChatsCommand(bot.bot);

  help.handle();
  registration.handle();
  order.handle();
  form.handle();
  button.handle();
  clear.handle();
  // запускаем 1 раз сервис который будет по очереди отправлять запрос в Google Sheets
  sessionServisPostOrder.start();
  batabase.initial();
  chat.handle();
  mychats.handle();

  //createChat();
  
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
