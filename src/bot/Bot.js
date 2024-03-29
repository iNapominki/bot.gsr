const TelegramBot = require("node-telegram-bot-api");
const responseTemplate = require("../commands/responseTemplate/responseTemplate");
//const startMiddelware = require("../middleware/startMiddelware");
const AipUse = require("../utils/api/apiUse");
const Api = require("../utils/api/api");
//const option_registration = require("../utils/option/options-reg");
const option_test = require("../utils/option/option_test");
//const use = require("node-telegram-bot-api-middleware").use;
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

    if (!request) {
      return;
    }

    return request;
  }

  start() {
    this.bot.onText(/\/start/, async (msg) => {
      this.bot.setMyCommands([
        { command: "/start", description: "Начальное приветствие" },
        { command: "/help", description: "Получить справку" },
        { command: "/order", description: "Оформить заявку" },
        { command: "/clear", description: "Отменить заполнение заявки" },
        { command: "/chats", description: "Мои чаты" },
        { command: "/logoutchat", description: "Выйти из чатов" },
      ]);

      const chatId = msg.chat.id;
      /////////////// тестовый функционал

      //////////
      this.bot.sendMessage(chatId, responseTemplate.start);
      await this._useCheskUser(chatId).then((user) => {
        if (user) {
          setTimeout(async () => {
            this.bot.sendMessage(
              chatId,
              "Для оформление заявки, нажмите /order"
            );
          }, 1000);
          return;
        } else {
        }
      });
    });
  }
}

module.exports = Bot;
