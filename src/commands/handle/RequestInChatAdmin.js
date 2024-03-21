const options_btn = require("../../utils/option/options_btn");
const responseTemplate = require("../responseTemplate/responseTemplate");

const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;

class RequestInChatAdmin {
     constructor(bot, request) {
        this.bot = bot;
        this.request = request; 
      }

       //простой текстовый ответ
  requestOrder(post, user) {
    console.log("this.request", this.request);

   

    setTimeout(async () => {
      await this.bot.sendMessage(TELEGRAMM_ADMIN_CHAT, responseTemplate.responseToAdminChat(this.request, post, user));
      await this.bot.sendMessage(post.tlgId, responseTemplate.responseToAgentChat(this.request, post, user), options_btn);
    }, 500);    
  }

  requestUSer(post) {    
    setTimeout(async () => {
      await this.bot.sendMessage(TELEGRAMM_ADMIN_CHAT,  responseTemplate.responseToAdminChatAboutRegostration(post));
      await this.bot.sendMessage(post.tlgId, "Ваши данные обновлены");
    }, 1000);    
  }

}
   
module.exports = RequestInChatAdmin;