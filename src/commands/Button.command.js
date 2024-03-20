const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;
const LoggerManager = require("../log/LoggerManager");
const SessionRegistration = require("../session/session.registration");
const Command = require("./command.class");
const SESSION_RESPONSE = require("../session/session.respons");
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


        //let stepRegistration;
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
          case "button_employee": 
          case "button_agent":

          let {step, message, option} = new SessionRegistration(query, this.bot).handleButton(command, chatId);
      this.requestMessage(chatId, message, option);
            
              // let stepRegistration = new SessionRegistration(query, this.bot).handleButton(command, chatId);               
              //  this.requestMessage(chatId, SESSION_RESPONSE.REG[stepRegistration].title);
               return;
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
