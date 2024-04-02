
const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;
const ChatHandle = require("../core/chats/chat-handle");
const Command = require("./command.class");
const responseTemplate = require("./responseTemplate/responseTemplate");

class MyIdCommand extends Command {
  constructor(bot) {
    super(bot)
  }
  handle() {
      this.bot.onText(/\/myid/, (msg) => {

        console.log(msg)

        new ChatHandle(this.bot).logoutChat(chatId);
        const chatId = msg.chat.id;
        const firstName = msg.chat.first_name ? msg.chat.first_name : ", имя отсутствует" ;
        const userName = msg.chat.username ? msg.chat.username : ", имя телеграм отсутствует";
        
        this.bot.sendMessage(chatId, `Ваш id ${chatId}`);
        this.bot.sendMessage(TELEGRAMM_ADMIN_CHAT, `Пользователь запросил свой id ${chatId}, имя: ${firstName} , имя телеграм ${userName}`);
      });
    }
  }
  
  module.exports = MyIdCommand;