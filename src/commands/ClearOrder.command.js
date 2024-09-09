//@ts-check

const SessionOrder = require("../session/session.order");
const Command = require("./command.class");

class ClearOrderCommand extends Command {
  constructor(bot) {
    super(bot);
  }

  handle() {
    this.bot.onText(/\/clear/, (msg) => {
      const chatId = msg.chat.id;
      const chatUsername = msg.chat.username;

      // let isCheckUserName = this.checkUserName(chatId, chatUsername);
      // // проверка заполнено ли имя
      // if (!isCheckUserName) {
      //   return;
      // }

      const message = new SessionOrder(msg, this.bot).clear(chatId);

      this.requestMessage(chatId, message, {});
      return;
    });
  }
}

module.exports = ClearOrderCommand;
