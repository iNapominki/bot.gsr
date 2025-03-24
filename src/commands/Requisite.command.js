//@ts-check

const ApiWeb = require("../utils/api/apiWeb");
const Command = require("./command.class");

class RequisiteCommand extends Command {
  constructor(bot) {
    super(bot)
  }
  handle() {
      this.bot.onText(/\/requisite/, (msg) => {
        const chatId = msg.chat.id;
        new ApiWeb(this.bot).botCommandRequisite(chatId);
      });
    }
  }
  
  module.exports = RequisiteCommand;