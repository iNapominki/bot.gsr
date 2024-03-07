const LoggerManager = require("../log/LoggerManager");
const Api = require("../utils/api/api");
const option_registration = require("../utils/option/options-reg");
const Command = require("./command.class");
const HandleForm = require("./handle/HandleForm");
const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;

class FormCommand extends Command {
  constructor(bot) {
    super(bot);
  }
  handle() {
    this.bot.on("message", async (msg) => {

      try {
     
      new LoggerManager().logMessage("log", "bot.on(message)", msg);
      const chatId = msg.chat.id;
      const chatUsername = msg.chat.username;
      const isMessageForm = msg?.web_app_data?.data ? "form" : false;

      if (msg.text === "/start") {
        return;
      }
      if (msg.text === "/help") {
        return;
      }
      if (msg.text === "/form") {
        return;
      }
      if (msg.chat.id == TELEGRAMM_ADMIN_CHAT) {
        this.requestMessage(
          chatId,
          "В этот чат может писать только бот"
        );
        return;
      }

      let isCheckUserName = this.checkUserName(chatId, chatUsername);
      if (!isCheckUserName) {
        return;
      }

      if (!isMessageForm) {
        this.requestMessage(
          chatId,
          "Вы не можете отправлять сообщения, для взаимодействия заполните необходимую форму"
        );
        return;
      }
      console.log("Обработка формы");

      try {
        const handleForm = new HandleForm(this.bot, msg);
        handleForm.start();
      } catch (e) {
        console.log("NEW ERROR", e);
        this.requestMessage(
          chatId,
          `Проблемы с отправкой формы, попробуйте еще или обратитесь к администратору. Текст ошибки и класс: ${e.message}`
        );
        new LoggerManager().logMessage("error", "Проблема с отправкой формы", e.message);
        return;
      }

    } catch (error) {
      new LoggerManager().logMessage("error", "error", error.message);
      //console.log(error);
    }
    });
  }
}

module.exports = FormCommand;
