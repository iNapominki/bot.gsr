// @ts-check

const cacheService = require("../cache/CacheService");
const Command = require("./command.class");
const Api = require("../utils/api/api");
const AipUse = require("../utils/api/apiUse");
const RequestInChatAdmin = require("../commands/handle/RequestInChatAdmin");

class ContactCommand extends Command {
  constructor(bot) {
    super(bot);
  }


  async postUser(phone, tlgId) {

    //return;

    const postData = {
      phone, tlgId
    };
    
    const api = new Api(this.bot);
    const request = await new AipUse(api).updateUser(postData); // updateUser

    console.log(request);

    if (!request) {
      return;
    }

    await new RequestInChatAdmin(this.bot, request).requestUSer({number: phone, tlgId: tlgId });
    return;
  }


  handle() {
    this.bot.on('contact', async (msg)  => {
      const chatId = msg.chat.id;
      const chatUsername = msg.chat.username;
      const contact = msg.contact;
      // let isCheckUserName = this.checkUserName(chatId, chatUsername);
      // // очистить кэш, так как после регистрации данные изменятся
      // cacheService.del(`${chatId}`);
      // // проверка заполнено ли имя
      // if (!isCheckUserName) {
      //   return;
      // }      
  
      if (contact) {
          const phoneNumber = contact.phone_number;
          this.bot.sendMessage(chatId, `Ваш номер телефона: ${phoneNumber} , ${chatId}`);
          this.postUser(phoneNumber, chatId);
        }

      return;
    });
  }
}

module.exports = ContactCommand;
