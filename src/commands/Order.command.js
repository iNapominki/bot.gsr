

const Command = require("./command.class");

class OrderCommand extends Command {
  constructor(bot) {
    super(bot)
  }
  handle() {
    this.bot.onText(/\/order/, (msg) => {
        const chatId = msg.chat.id;
        this.bot.sendMessage(chatId, 'Заяка на регистрацию.');
      });
    }
  }
  
  module.exports = OrderCommand;