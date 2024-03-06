const GOOGLE_SHEETS_KEY_USERS = process.env.GOOGLE_SHEETS_KEY_USERS;
const GOOGLE_SHEETS_KEY_ORDERS = process.env.GOOGLE_SHEETS_KEY_ORDERS;
const fetch = require("node-fetch");

class Api {
  constructor(bot) {
    this.bot = bot;
  }

  //простой текстовый ответ
  requestMessageOnApi(chatId, message) {
    setTimeout(async () => {
      await this.bot.sendMessage(chatId, message);
    }, 2000);
  }

  async updateUser(postData) {
    console.log(postData);

    try {
      const response = await fetch(`${GOOGLE_SHEETS_KEY_USERS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      let manager = await response.json();
      console.log(manager, "ответ 1");
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

      let user = await response.json();

      console.log(user, "checkUser");

      if (user.result.code === 200) {
        return user.result.message;
      } else if (user.result.code === 403) {
        console.log(postData.tlgId, user.result.message);

        this.requestMessageOnApi(
          postData.tlgId,
          "Вы неможете отправлять заявки, либо заблокированы либо не зарегистрированы, обратитесь к администратору"
        );

        return false;
        // console.log(user.result, "Данные при ответе при неудачном ответе")
        // return user.result;
      } else {
        throw new Error("Непредвиденная ошибка в api");
        // ответ в чат что что то сломалось
        console.log(user, "Ошибка Статус не 200");
        return;
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса проверки пользователя:", error);
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
      console.log(order, "ответ 1");

      if (order.result.code === 200) {
        return order.result.message;
      } else {
        console.log(" postOrder до конца не отработал");
      }
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
