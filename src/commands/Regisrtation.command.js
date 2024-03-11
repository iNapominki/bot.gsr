const option_registration = require("../utils/option/options-reg");
const Command = require("./command.class");

class RegisrtationCommand extends Command {
  constructor(bot) {
    super(bot);
  }
  handle() {
    this.bot.onText(/\/form/, (msg) => {
      const chatId = msg.chat.id;
      const chatUsername = msg.chat.username;
      let isCheckUserName = this.checkUserName(chatId, chatUsername);
      // проверка заполнено ли имя
      if (!isCheckUserName) {
        return;
      }

      this.bot.sendMessage(chatId, "Формы для заполнения", option_registration);
    });
  }
}

module.exports = RegisrtationCommand;
