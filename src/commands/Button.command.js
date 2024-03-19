const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;
const LoggerManager = require("../log/LoggerManager");
const SessionRegistration = require("../session/session.registration");
const Command = require("./command.class");
class Buttoncommand extends Command {
  constructor(bot) {
    super(bot);
  }

  handle() {
    this.bot.on("callback_query", (query) => {
      try {
        let chatId = query.from.id;
        let message = query?.message?.text;
        let command = query?.data;

        new LoggerManager().logMessage("log", "bot.on(callback_query)", query);


        let stepRegistration;
        switch (command) {

          case "button_status":
            this.requestMessage(
              chatId,
              "Администратору направлен запрос уточнить статус"
            );
            this.requestMessage(
              TELEGRAMM_ADMIN_CHAT,
              `Просьба уточнить статус по зявке \n\n ${message}`
            );

            return;
            break;
          case "button_emploee":
          case "button_agent":
            
            stepRegistration = new SessionRegistration(query).handleButton(command, chatId);
               return stepRegistration;
            //console.log(stepRegistration);
            return;
            break;           
          default:
            return;
            break;
        }
      } catch (error) {
        new LoggerManager().logMessage("error", "error", error.message);
      }
    });
  }
}

module.exports = Buttoncommand;
