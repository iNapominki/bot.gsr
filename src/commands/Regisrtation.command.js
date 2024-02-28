const option_registration = require("../utils/option/options-reg");
const Command = require("./command.class");

class RegisrtationCommand extends Command {
  constructor(bot) {
    super(bot)
  }
  handle() {
      this.bot.onText(/\/registration/, (msg) => {
        const chatId = msg.chat.id;
        this.bot.sendMessage(chatId, 'Команда регистрации.', option_registration);
      });

      
    }
  }
  
  module.exports = RegisrtationCommand;