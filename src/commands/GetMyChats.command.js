//const SessionOrder = require("../session/session.order");
//const { getAllChats } = require("../core/chats/chat-controller");
const ChatHandle = require("../core/chats/chat-handle");
const optionButtonChats = require("../utils/option/option_button_chats");
//const option_data_dateLeft = require("../utils/option/option_data_dateLeft");
const Command = require("./command.class");

class GetMyChatsCommand extends Command {
  constructor(bot) {
    super(bot);
  }

  handle() {
    this.bot.onText(/\/mychats/, async (msg) => {
      try {
        const chatId = msg.chat.id;
        const chatUsername = msg.chat.username;
        let isCheckUserName = this.checkUserName(chatId, chatUsername);
        // проверка заполнено ли имя
        if (!isCheckUserName) {
          return;
        }
        const chat = await new ChatHandle().getMyChats(chatId);
        const option = optionButtonChats(chat.button);
        this.requestMessage(chatId, chat.message, option);

        return;
      } catch (e) {
        console.error(e);
      }
    });
  }
}

module.exports = GetMyChatsCommand;
