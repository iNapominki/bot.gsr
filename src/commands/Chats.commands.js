//@ts-check

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

        // Удаляем все переносы строк из переменной message
        const cleanedMessage = message.replace(/\n/g, '');
        // ВАЖНО, данные берутся их google sheets и просто парс не работает, приходится удалять все лишнее
        const validMessage = cleanedMessage.replace(
          /(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
          '"$2": '
        );
        
        console.log(message);

        // Преобразуем строку в объект
        const chatData = JSON.parse(validMessage);     
       
        let order = chatData?.order ? chatData?.order : "order не найден";
        let employee = chatData?.employee
          ? chatData?.employee
          : "employee не найден";
        let agent = chatData?.agent ? chatData?.agent : "agent не найден";
        let customer = chatData?.customer ? chatData?.customer : "номер заказчика не найден";
        let lid = chatData?.lid ? chatData?.lid : "заказчик";

        const chat = await new ChatHandle(this.bot).createChat(order, employee, agent, customer, lid);        
        // возвращает
        const { status, id } = chat;

        if (!status) {
         // "Канал создавать не нужно"
          return;
        }

        if(!TELEGRAMM_ADMIN_CHAT) {
          return
        }

        await this.requestMessage(
          TELEGRAMM_ADMIN_CHAT,
          `Менеджер взял заявку и создал чат по заявке ${order}`
        );
      } catch (e) {

        if(!TELEGRAMM_ADMIN_CHAT) {
          return
        }

        this.requestMessage(
          TELEGRAMM_ADMIN_CHAT,
          `Чат по заявке не создан, менеджер заявку взял`
        );
        console.error(e);
      }
    });
  }
}

module.exports = ChatsCommands;
