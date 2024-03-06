class Command {
  constructor(bot) {
    this.bot = bot;
  }

  

  //простой текстовый ответ
  requestMessage(chatId, message) {
    setTimeout(async () => {
      await this.bot.sendMessage(chatId, message);
    }, 2000);
  }



  //быстрая проверка заполнено ли имя у пользователя телеграмм
   checkUserName(chatId, chatUsername) {
    let isCheckUserName = true;
    if(!chatUsername) {
        this.requestMessage(chatId, `Вы не можете пользоваться ботом, заполните имя телеграмм ваш ИД ${chatId}` );
        isCheckUserName = false;       
    }
    return isCheckUserName;
  }
}

module.exports = Command;
