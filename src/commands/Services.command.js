//@ts-check

const ApiWeb = require("../utils/api/apiWeb");
const Command = require("./command.class");

class ServicesCommand extends Command {
  constructor(bot) {
    super(bot)
  }
  handle() {
      this.bot.onText(/\/services/, (msg) => {
        const chatId = msg.chat.id;
        new ApiWeb(this.bot).botCommandServices(chatId);
      });
    }
  }
  
  module.exports = ServicesCommand;