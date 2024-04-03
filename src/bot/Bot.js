const TelegramBot = require("node-telegram-bot-api");
const responseTemplate = require("../commands/responseTemplate/responseTemplate");
//const startMiddelware = require("../middleware/startMiddelware");
const AipUse = require("../utils/api/apiUse");
const Api = require("../utils/api/api");
//const option_registration = require("../utils/option/options-reg");
const option_test = require("../utils/option/option_test");
const SessionRegistration = require("../session/session.registration");
//const use = require("node-telegram-bot-api-middleware").use;
class Bot {
  constructor(token) {
    this.bot = new TelegramBot(token, { polling: true });
  }

    //быстрая проверка заполнено ли имя у пользователя телеграмм
    checkUserName(chatId, chatUsername) {
      let isCheckUserName = true;
      if (!chatUsername) {
        this.bot.sendMessage(
          chatId,
          `Вы не можете пользоваться ботом, заполните имя телеграмм ваш ИД ${chatId}`
        );
        isCheckUserName = false;
      }
      return isCheckUserName;
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

try {
    this.bot.onText(/\/start/, async (msg) => {
      this.bot.setMyCommands([
        { command: "/start", description: "Начальное приветствие" },
        { command: "/help", description: "Получить справку" },
        { command: "/order", description: "Оформить заявку" },
        { command: "/clear", description: "Отменить заполнение заявки" },
        { command: "/chats", description: "Мои чаты" },
        { command: "/logoutchat", description: "Выйти из чатов" },
        { command: "/myid", description: "Запросить мой id" },
      ]);

      const chatId = msg.chat.id;
      const chatUsername = msg.chat.username;
      // очистка сесии регистрации
    new  SessionRegistration(msg, this.bot).clear(chatId);
      //
      this.bot.sendMessage(chatId, responseTemplate.start);


      let isCheckUserName = this.checkUserName(chatId, chatUsername);
      // проверка заполнено ли имя
      if (!isCheckUserName) {
        return;
      }

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

  } catch (e) {
    console.error(e);
  }



  }
}

module.exports = Bot;
