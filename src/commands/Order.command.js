const SessionOrder = require("../session/session.order");
const Api = require("../utils/api/api");
const AipUse = require("../utils/api/apiUse");
const Command = require("./command.class");

class OrderCommand extends Command {
  constructor(bot) {
    super(bot);
  }

  async _useCheskUser(tlgId) {
    let checkPost = {
      action: "check",
      tlgId: `${tlgId}`,
    };
    const api = new Api(this.bot);
    const request = await new AipUse(api).checkUser(checkPost);

    if (!request) {
      return;
    }

    return request;
  }




  handle() {
    this.bot.onText(/\/order/, async (msg) => {
      const chatId = msg.chat.id;
      const chatUsername = msg.chat.username;
   // проверка не нахожусь ли я в режиме чата 
   const inChat = await this.checkinChat(chatId);

   if(inChat.status) {
    this.requestMessage(chatId, inChat.message, {});
    return;
   }


      // первичная проверка при создании заявки, заявку может создать только зарегистрированный пользователь
      this._useCheskUser(chatId).then((user) => {
        if (user) {
          let isCheckUserName = this.checkUserName(chatId, chatUsername);
          // проверка заполнено ли имя
          if (!isCheckUserName) {
            return;
          }

          let { step, message, option } = new SessionOrder(
            msg,
            this.bot
          ).createSession();
          this.requestMessage(chatId, message, option);
          return;
        }
      });
    });
  }
}

module.exports = OrderCommand;
