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
  requestMessageOnApi(chatId, message) {
    setTimeout(async () => {
      await this.bot.sendMessage(chatId, message);
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
      console.error("Ошибка при выполнении запроса:", error);
    }
  }

  async checkUser(postData) {
    console.log("checkUser", postData);

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
      console.error("Ошибка при выполнении запроса:", error);
    }
  }

  async postOrder(postData) {
    console.log(postData);

    try {
      const response = await fetch(`${GOOGLE_SHEETS_KEY_ORDERS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      let order = await response.json();
      console.log(order, "ответ postOrder");

      if (order.result.code === 200) {
        return order.result.message;
      } else {
        console.log(" postOrder до конца не отработал");
      }
      this.requestMessageOnApi(
        TELEGRAMM_ADMIN_CHAT,
        `Записать в Google Sheets не удалось, возможно гугл таблицы не отвечают, вот информация ${JSON.stringify(
          postData
        )} `
      );
      return;
      //     if (response.status === 200) {

      // console.log(manager, 200)
      //       return;
      //     } else {

      //       console.log(manager, "не 200")
      //       return;
      //     }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  }
}

module.exports = Api;
