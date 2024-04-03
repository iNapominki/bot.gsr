const GOOGLE_SHEETS_KEY_USERS = process.env.GOOGLE_SHEETS_KEY_USERS;
const GOOGLE_SHEETS_KEY_ORDERS = process.env.GOOGLE_SHEETS_KEY_ORDERS;
const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;
const fetch = require("node-fetch");
const LoggerManager = require("../../log/LoggerManager");

class Api {
  constructor(bot) {
    this.bot = bot;
  }

  //простой текстовый ответ вынести в apiUse
  requestMessageOnApi(chatId, message, option = {}) {
    setTimeout(async () => {
      await this.bot.sendMessage(chatId, message, option);
    }, 2000);
  }

  async updateUser(postData) {
    try {
      const response = await fetch(`${GOOGLE_SHEETS_KEY_USERS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      let res = await response.json();
      return res;
    } catch (error) {
      new LoggerManager().logMessage("error", "error", error.message);
      console.error("Ошибка при выполнении запроса updateUser:", error);
      this.requestMessageOnApi(TELEGRAMM_ADMIN_CHAT, `Ошибка Google sheets при регистрации пользователя ${ JSON.stringify(postData) }`, {});
    }
  }

  async checkUser(postData) {
    try {      
      const response = await fetch(`${GOOGLE_SHEETS_KEY_USERS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      let res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
      new LoggerManager().logMessage("error", "checkUser", error.message);
      console.error("Ошибка при выполнении запроса checkUser:", error);
     this.requestMessageOnApi(TELEGRAMM_ADMIN_CHAT, `Ошибка Google sheets при проверки пользователя ${ JSON.stringify(postData) }`, {});
    }
  }

  async postOrder(postData) {
    try {
      const response = await fetch(`${GOOGLE_SHEETS_KEY_ORDERS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      let res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
      console.error("Ошибка при выполнении запроса postOrder:", error);
      this.requestMessageOnApi(TELEGRAMM_ADMIN_CHAT, `Ошибка Google sheets при отправке заказа ${ JSON.stringify(postData) }`, {});
    }
  }
}

module.exports = Api;
