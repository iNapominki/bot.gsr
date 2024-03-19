const TelegramBot = require("node-telegram-bot-api");
const responseTemplate = require("../commands/responseTemplate/responseTemplate");
const startMiddelware = require("../middleware/startMiddelware");
const AipUse = require("../utils/api/apiUse");
const Api = require("../utils/api/api");
const use = require("node-telegram-bot-api-middleware").use;
class Bot {
  constructor(token) {
    this.bot = new TelegramBot(token, { polling: true });
    
  }

  async _useCheskUser(tlgId) {
    let checkPost = {
      action: "check",
      tlgId: `${tlgId}`,
    };
    const api = new Api(this.bot);
    const request = await new AipUse(api).checkUser(checkPost);
    console.log(request);
    if (!request) {
      return;
    }
  }

  start() {
    // содержание кнопки меню
    this.bot.setMyCommands([
      { command: "/start", description: "Начальное приветствие" },
      { command: "/help", description: "Получить справку" },
      //{ command: "/form", description: "Форма (Регистрации/Заявки/Сообщения)" },
      { command: "/registration", description: "Регистрация" },
      
      // { command: "/order", description: "Форма для заявки" },
    ]);

    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(
        chatId,
        "Добро пожаловать в бот Сети поминальных залов, Обратите внимание для работы с ботом обязательно должно быть заполнено имя в телеграм"
      );
      this._useCheskUser(chatId)
      //this.bot.sendMessage(chatId, responseTemplate.start);
      return;
    });
  }
}

module.exports = Bot;
