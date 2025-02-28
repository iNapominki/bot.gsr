//@ts-check

const ApiWeb = require("../utils/api/apiWeb");
const Command = require("./command.class");

class MenuCommand extends Command {
  constructor(bot) {
    super(bot)
  }
  handle() {
      this.bot.onText(/\/menu/, (msg) => {
        const chatId = msg.chat.id;
        new ApiWeb(this.bot).botCommandMenu(chatId);
      });
    }
  }
  
  module.exports = MenuCommand;