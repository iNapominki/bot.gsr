//@ts-check

const ApiWeb = require("../utils/api/apiWeb");
const Command = require("./command.class");

class AboutCommand extends Command {
  constructor(bot) {
    super(bot)
  }
  handle() {
      this.bot.onText(/\/about/, (msg) => {
        const chatId = msg.chat.id;
        new ApiWeb(this.bot).botCommandAbout(chatId); 
      });
    }
  }
  
  module.exports = AboutCommand;