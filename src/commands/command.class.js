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
//   async checkUserName(chatId, chatUsername) {
//     if(!chatUsername) {
//        await this.requestMessage(chatId, "Вы не можете пользоваться ботом, заполните имя телеграмм" );
//         return;
//     }
//    await this.requestMessage(chatId, `Ваше имя телеграмм ${chatUsername}` );
//   }
}

module.exports = Command;
