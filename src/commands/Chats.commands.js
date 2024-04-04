const ChatHandle = require("../core/chats/chat-handle");
const Command = require("./command.class");
const responseTemplate = require("./responseTemplate/responseTemplate");
const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;

class ChatsCommands extends Command {
  constructor(bot) {
    super(bot);
  }
  handle() {
    this.bot.on("channel_post", async (msg) => {
      try {
        const message = msg.text;
        // ВАЖНО, данные берутся их google sheets и просто парс не работает, приходится удалять все лишнее
        const validMessage = message.replace(
          /(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
          '"$2": '
        );

        // Преобразуем строку в объект
        const chatData = JSON.parse(validMessage);        
        let order = chatData?.order ? chatData?.order : "order не найден";
        let employee = chatData?.employee
          ? chatData?.employee
          : "employee не найден";
        let agent = chatData?.agent ? chatData?.agent : "agent не найден";
        let customer = chatData?.customer ? chatData?.customer : "номер заказчика не найден";

        const chat = await new ChatHandle(this.bot).createChat(order, employee, agent, customer);        
        // возвращает
        const { status, id } = chat;

        if (!status) {
         // "Канал создавать не нужно"
          return;
        }

        await this.requestMessage(
          TELEGRAMM_ADMIN_CHAT,
          `Создан чат по заявке ${order}`
        );
      } catch (e) {
        console.error(e);
      }
    });
  }
}

module.exports = ChatsCommands;
