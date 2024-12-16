//@ts-check

const ChatHandle = require("../core/chats/chat-handle");
const Command = require("./command.class");
const responseTemplate = require("./responseTemplate/responseTemplate");
const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;

class ChatsCommands extends Command {
  constructor(bot) {
    super(bot);
  }
  handle() {
    this.bot.on("channel_post", async (msg) => {
      try {
        const message = msg.text;    
        
        console.log(msg);  
    
      } catch (e) {

        if(!TELEGRAMM_ADMIN_CHAT) {
          return
        }
        console.error(e);
      }
    });
  }
}

module.exports = ChatsCommands;
