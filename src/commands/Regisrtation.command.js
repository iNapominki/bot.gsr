const SessionRegistration = require("../session/session.registration");
const SESSION_RESPONSE = require("../session/session.respons");
//const Api = require("../utils/api/api");
//const AipUse = require("../utils/api/apiUse");
//const option_registration = require("../utils/option/options-reg");
const Command = require("./command.class");

class RegisrtationCommand extends Command {
  constructor(bot) {
    super(bot);
  }


  handle() {
    // this.bot.onText(/\/form/, (msg) => {
    this.bot.onText(/\/registration/, (msg) => {
      const chatId = msg.chat.id;
      const chatUsername = msg.chat.username;
      let isCheckUserName = this.checkUserName(chatId, chatUsername);
      // проверка заполнено ли имя
      if (!isCheckUserName) {
        return;
      }

    

      let stepRegistration = new SessionRegistration(msg).createSession();
      this.requestMessage(chatId, SESSION_RESPONSE.REG[stepRegistration].title, SESSION_RESPONSE.REG[stepRegistration].option);
      return;
    });
  }
}

module.exports = RegisrtationCommand;
