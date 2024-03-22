const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;
const LoggerManager = require("../log/LoggerManager");
const SessionRegistration = require("../session/session.registration");
const Command = require("./command.class");
const SESSION_RESPONSE = require("../session/session.respons");
const SessionOrder = require("../session/session.order");
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
        const messageId = query.message.message_id;

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
          case "button_reg_employee":
          case "button_reg_agent":
            let reg = new SessionRegistration(query, this.bot).handleButton(
              command,
              chatId,
              messageId
            );
            this.requestMessage(chatId, reg.message, reg.option);
            return;
            break;

          // кнопки по городам
          case "button_order_moscow":
          case "button_order_mo":
          case "button_order_cpb":
          case "button_order_lo":
          case "button_order_nn":

          // кнопки со временем
          case "9:00-9:30":
          case "9:30-10:00":
          case "10:00-10:30":
          case "10:30-11:00":
          case "11:00-11:30":
          case "11:30-12:00":
          case "12:00-12:30":
          case "12:30-13:00":
          case "13:00-13:30":
          case "13:30-14:00":
          case "14:00-14:30":
          case "14:30-15:00":
          case "15:00-15:30":
          case "15:30-16:00":
          case "16:00-16:30":
          case "16:30-17:00":
          case "17:00-17:30":
          case "17:30-18:00":
          case "18:00-18:30":
          case "18:30-19:00":
          case "19:00-19:30":
          case "19:30-20:00":
          case "20:00-20:30":
          case "20:30-21:00":
          case "21:00-21:30":
          case "21:30-22:00":
            let order = new SessionOrder(query, this.bot).handleButton(
              command,
              chatId,
              messageId
            );
            console.log(order);
            this.requestMessage(chatId, order.message, order.option);
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
