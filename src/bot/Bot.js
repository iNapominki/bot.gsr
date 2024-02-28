const TelegramBot = require('node-telegram-bot-api');

class Bot {
  constructor(token) {
    this.bot = new TelegramBot(token, { polling: true });
  }

  start() {


     // содержание кнопки меню
  this.bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },    
    { command: "/help", description: "Получить справку" },   
    { command: "/registration", description: "Форма для регистрации в боте" },
    { command: "/order", description: "Форма для заявки" },   
  ]);

    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(chatId, 'Добро пожаловать в бот Сети поминальных залов');
    });
  }
}

module.exports = Bot;