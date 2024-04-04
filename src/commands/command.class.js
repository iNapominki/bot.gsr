const ChatHandle = require("../core/chats/chat-handle");

class Command {
  constructor(bot) {
    this.bot = bot;
  }

  //простой текстовый ответ
  requestMessage(chatId, message, option) {
    setTimeout(async () => {
      await this.bot.sendMessage(chatId, message, option);
    }, 500);
  }

  //быстрая проверка заполнено ли имя у пользователя телеграмм
  checkUserName(chatId, chatUsername) {
    let isCheckUserName = true;
    if (!chatUsername) {
      this.requestMessage(
        chatId,
        `Вы не можете пользоваться ботом, заполните имя телеграмм ваш ИД ${chatId}`
      );
      isCheckUserName = false;
    }
    return isCheckUserName;
  }

  async checkinChat(chatId) {
    const inChatData = await new ChatHandle(this.bot).checkInChat(chatId);
    if (inChatData.status) {      
      return {
        status: true,
        message:
          "Вы сейчас находитесь в режиме чата, и не можете начать оформление заявки, пожалуйста выйдите из чата командой /logoutchat",
      };
    } else {
      return { status: false, message: "" };
    }
  }
}

module.exports = Command;
