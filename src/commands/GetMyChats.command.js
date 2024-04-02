
const ChatHandle = require("../core/chats/chat-handle");
const SessionOrder = require("../session/session.order");
const optionButtonChats = require("../utils/option/option_button_chats");
const Command = require("./command.class");

class GetMyChatsCommand extends Command {
  constructor(bot) {
    super(bot);
  }

  handle() {
    this.bot.onText(/\/chats/, async (msg) => {
      try {
          


        const chatId = msg.chat.id;
        const chatUsername = msg.chat.username;

        // очистка заявок
        await new SessionOrder(msg, this.bot).clear(chatId);

        let isCheckUserName = this.checkUserName(chatId, chatUsername);
        // проверка заполнено ли имя
        if (!isCheckUserName) {
          return;
        }
        const chat = await new ChatHandle(this.bot).getMyChats(chatId);        

        if(!chat.status) {
          this.requestMessage(chatId, chat.message, {});
          return;
        }

        

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
