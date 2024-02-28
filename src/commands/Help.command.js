const Command = require("./command.class");

class HelpCommand extends Command {
  constructor(bot) {
    super(bot)
  }
  handle() {
      this.bot.onText(/\/help/, (msg) => {
        const chatId = msg.chat.id;
        this.bot.sendMessage(chatId, 'Команда помощь.');
      });
    }
  }
  
  module.exports = HelpCommand;