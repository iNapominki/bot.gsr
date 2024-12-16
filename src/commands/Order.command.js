// @ts-check

const ChatHandle = require("../core/chats/chat-handle");
const SessionOrder = require("../session/session.order");
const Api = require("../utils/api/api");
const AipUse = require("../utils/api/apiUse");
const ApiWeb = require("../utils/api/apiWeb");
const copirite_text = require("../utils/const/copirite_admin");
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
      //await this.bot.deleteMessage(chatId, msg.message_id);


          // Отправляем сообщение с пустой клавиатурой
          const options = {
            reply_markup: {
              remove_keyboard: true, // Удаляем клавиатуру
            },
          };



      await this.bot.sendMessage(chatId, '.', options );  //Начато оформление заявки, заполняйте информацию по очереди
     new ApiWeb(this.bot).botCommandOrder(chatId);
      // проверка не нахожусь ли я в режиме чата
      //await  new ChatHandle(this.bot).logoutChat(chatId);

      // первичная проверка при создании заявки, заявку может создать только зарегистрированный пользователь
      //this._useCheskUser(chatId).then((user) => {
        
        // if (user) {
        //   // оформлять заявки только менеджер
        //   if (!(typeof user == "string" || typeof user == "boolean") && user?.role != "agent") {
        //     this.bot.sendMessage(
        //       chatId,
        //       "Оформлять заявки может только агент, обратитесь к администратору /help",
        //       {}
        //     );
        //     return;
        //   }

        //   // let isCheckUserName = this.checkUserName(chatId, chatUsername);
        //   // // проверка заполнено ли имя
        //   // if (!isCheckUserName) {
        //   //   return;
        //   // }  
          
        //   if((typeof user == "string" || typeof user == "boolean") ) {
        //     return;
        //   }

        //   const { spzId, sponsorName, name } = user;          

        //   let { step, message, option } = new SessionOrder(
        //     msg,
        //     this.bot
        //   ).createSession(`${spzId}`, sponsorName, name);
        //   this.requestMessage(chatId, message, option);
        //   return;
        // } else {
        //   // если что то с таблицами не так, то пользователь получит это сообщение
        //   this.requestMessage(chatId, `Пока нельзя оформлять заявки, если есть вопросы обратитесь к ${copirite_text.admin}` , {});
        // }
      //});
    });
  }
}

module.exports = OrderCommand;
