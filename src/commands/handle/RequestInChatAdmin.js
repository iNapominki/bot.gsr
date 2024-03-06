const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;

class RequestInChatAdmin {
     constructor(bot, request) {
        this.bot = bot;
        this.request = request; 
      }

       //простой текстовый ответ
  requestOrder(post) {
    console.log("this.request", this.request);
    setTimeout(async () => {
      await this.bot.sendMessage(TELEGRAMM_ADMIN_CHAT, `Номер заявки в Google Sheets ${this.request} содержание заявки ${JSON.stringify(post)}`);
      await this.bot.sendMessage(post.tlgId, `Заявка принята в Google Sheets ${this.request} содержание заявки ${JSON.stringify(post)}`);
    }, 2000);    
  }

  requestUSer(post) {
    
    setTimeout(async () => {
      await this.bot.sendMessage(TELEGRAMM_ADMIN_CHAT, `Пользователь внес данные в таблицу пользователей ${JSON.stringify(post)}`);
      await this.bot.sendMessage(post.tlgId, "Ваши данные обновлены");
    }, 2000);    
  }

}
   
module.exports = RequestInChatAdmin;