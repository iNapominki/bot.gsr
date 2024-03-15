const TelegramBot = require('node-telegram-bot-api');
const responseTemplate = require('../commands/responseTemplate/responseTemplate');
const startMiddelware = require('../middleware/startMiddelware');
const use = require('node-telegram-bot-api-middleware').use;
class Bot {
  constructor(token) {
    this.bot = new TelegramBot(token, { polling: true });
  }

  start() {

    let response = use(startMiddelware);  
 
       // содержание кнопки меню
  this.bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },    
    { command: "/help", description: "Получить справку" },   
    
    { command: "/form", description: "Форма (Регистрации/Заявки/Сообщения)" },
    // { command: "/order", description: "Форма для заявки" },   
  ]);


   this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;      
      this.bot.sendMessage(chatId, 'Добро пожаловать в бот Сети поминальных залов');
      this.bot.sendMessage(chatId, 'Обратите внимание для работы с ботом обязательно должно быть заполнено имя в телеграм'); 
      this.bot.sendMessage(chatId, responseTemplate.start);      
      return;     
    }); 
  

  
  }
}

module.exports = Bot;