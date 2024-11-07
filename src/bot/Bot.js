// @ts-check

const TelegramBot = require("node-telegram-bot-api");
const responseTemplate = require("../commands/responseTemplate/responseTemplate");
const AipUse = require("../utils/api/apiUse");
const Api = require("../utils/api/api");
const SessionRegistration = require("../session/session.registration");
const cacheService = require("../cache/CacheService");
const express = require("express");
const ApiWeb = require("../utils/api/apiWeb");
const port = process.env.EXPRESS_PORT || 8000;

class Bot {
  /**
   * @param {string} token
   */
  constructor(token) {
    this.bot = new TelegramBot(token, { polling: true });

    // const app = express();
    // app.use(express.json());
    // app.get("/", function (req, res) {
    //   res.send({ status: true });
    // });

    // Запускаем Express сервер
    // app.listen(port, () => {
    //   console.log(`Express server слушает порт ${port}`);
    // });
  }

  // constructor(token) {
  //   const TOKEN = token;
  //   const url = 'http://95.181.226.126';
  //   //const port = process.env.EXPRESS_PORT || 3000;
  //   const port = 8000;

  //   this.bot = new TelegramBot(TOKEN);

  //   // Устанавливаем webhook
  //   this.bot.setWebHook(`${url}/bot${TOKEN}`);

  //   const app = express();

  //   // Парсим обновления в формат JSON
  //   app.use(express.json());

  //   // Обрабатываем обновления от Telegram
  //   app.post(`/bot${TOKEN}`, (req, res) => {
  //     this.bot.processUpdate(req.body);
  //     res.sendStatus(200);
  //   });

  //   // Запускаем Express сервер
  //   app.listen(port, () => {
  //     console.log(`Express server слушает порт  ${port}`);
  //   });

  // }

  //быстрая проверка заполнено ли имя у пользователя телеграмм
  /**
   * @param {number} chatId
   * @param {string | undefined} chatUsername
   */
  // checkUserName(chatId, chatUsername) {
  //   let isCheckUserName = true;
  //   if (!chatUsername) {
  //     this.bot.sendMessage(
  //       chatId,
  //       `Вы не можете пользоваться ботом, заполните имя телеграмм ваш ИД ${chatId}`
  //     );
  //     isCheckUserName = false;
  //   }
  //   return isCheckUserName;
  // }

  /**
   *
   * @param {number} tlgId
   * @returns
   */

  // async _useCheskUser(tlgId) {
  //   // очистить кэш, так как после регистрации данные изменятся
  //   cacheService.del(`${tlgId}`);

  //   let checkPost = {
  //     action: "check",
  //     tlgId: `${tlgId}`,
  //   };
  //   const api = new Api(this.bot);
  //   const request = await new AipUse(api).checkUser(checkPost);

  //   if (!request) {
  //     return;
  //   }

  //   return request;
  // }

  start() {
    try {
      this.bot.onText(/\/start/, async (msg) => {
        this.bot.setMyCommands([
          { command: "/start", description: "Начальное приветствие" },
          { command: "/help", description: "Получить справку" },
          { command: "/order", description: "Оформить заявку" },
          {
            command: "/clear",
            description: "Отменить заполнение заявки/выйти из чатов",
          },
          { command: "/chats", description: "Мои чаты" },
          // { command: "/logoutchat", description: "Выйти из чатов" },
          { command: "/myid", description: "Запросить мой id" },
        ]);
        const chatId = msg.chat.id;
        console.log(msg.message_id);

        new ApiWeb(this.bot).botCommandStart(chatId);
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Bot;
