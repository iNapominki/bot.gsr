// errorLog.json

const LoggerManager = require("../log/LoggerManager");
const Command = require("./command.class");
const ApiWeb = require("../utils/api/apiWeb");

class FormCommand extends Command {
  constructor(bot) {
    super(bot);
  }
  handle() {
    this.bot.on("message", async (msg) => {
      try {
        //   console.log(msg);

        new LoggerManager().logMessage("log", "bot.on(message)", msg);
        const chatId = msg.chat.id;

        if (msg.text === "/start") {
          return;
        }
        if (msg.text === "/help") {
          return;
        }

        if (msg.text === "/registration") {
          return;
        }

        if (msg.text === "/order") {
          return;
        }

        if (msg.text === "/clear") {
          return;
        }
        if (msg.text === "/chats") {
          return;
        }

        if (msg.text === "/logoutchat") {
          return;
        }

        if (msg.text === "/myid") {
          return;
        }

        if (msg.text === "/cleancache") {
          return;
        }

        if (msg.text === "/about") {
          return;
        }

        if (msg.text === "/services") {
          return;
        }

        if (msg.text === "/menu") {
          return;
        }

        if (msg.text === "/fast") {
          return;
        }

        const dataFromWebApp = msg.web_app_data?.data;

        if (dataFromWebApp) {
          try {
            const parsedData = JSON.parse(dataFromWebApp);

             await this.bot.sendMessage(
              chatId,
              `Вы отправили сообщение: ${parsedData.comment}`
            );
           
            await this.bot.sendMessage(
              parsedData.tlgId,
              `Сообщение от куратора: ${parsedData.comment}`
            );
          } catch (err) {
            await this.bot.sendMessage(
              chatId,
              "Ошибка чтения данных из Web App."
            );
          }

          return;
        }

        if (!msg.text) {
          return;
        }

        new ApiWeb(this.bot).botMessage(
          chatId,
          msg.text,
          msg.message_id,
          msg.message_id
        );
        return;
      } catch (error) {
        new LoggerManager().logMessage("error", "error", error.message);
        console.log(error);
      }
    });
  }
}

module.exports = FormCommand;
