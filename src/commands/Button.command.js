//@ts-check

const LoggerManager = require("../log/LoggerManager");
const Command = require("./command.class");
const ApiWeb = require("../utils/api/apiWeb");
class ButtonsCommand extends Command {
  constructor(bot) {
    super(bot);
  }

  handle() {
    this.bot.on("callback_query", async (query) => {
      try {
        console.log(query);

        const commandData = query.data;
        const nameCommand = commandData.split("_")[0];
        const valueCommand = commandData.split("_")[1];
        const valueSecondCommand = commandData.split("_")[2];

        console.log(nameCommand);
        console.log(commandData);
        switch (nameCommand) {
          // отработка промо
          case "promo":
            await this.bot.deleteMessage(
              query.message.chat.id,
              query.message.message_id
            );
            new ApiWeb(this.bot).botPromo(query.from.id, valueCommand);
            break;
          //для работы с отзывами
          case "rewiewApprove":
            new ApiWeb(this.bot).botButtonsReviewApprove(
              query.message.chat.id,
              query.from.id,
              valueCommand,
              valueSecondCommand
            );
            
            try {
              if (
                typeof query.message.chat.id === 'number' &&
                typeof query.message.message_id === 'number'
              ) {
                  console.log("Приведены к числу");
                  await this.bot.deleteMessage(query.message.chat.id, query.message.message_id);
              } else {
                  console.log("Нужно привести к числу");
              }
            } catch (err) {
              console.error(err);
              await this.bot.sendMessage(query.message.chat.id, 'Отзыв отправлен! Нумерция сообщений сбита - кнопки не удалены!');
            }

            console.log(
               query.message.chat.id,
               query.message.message_id
            );

            break;
          // варианты для оформления заявки
          case "timeWake":
          case "fio":
          case "city":
          case "comment":
          case "placeWake":
          case "default":
          case "dataDeath":
          case "dataGoodbyes":
          case "fioDeath":
            //  console.log(query.message.chat.id, query.data, query.message.message_id, query.message.message_id);
            await this.bot.deleteMessage(
              query.message.chat.id,
              query.message.message_id
            );
            // !! не трогать
            new ApiWeb(this.bot).botMessage(
              query.message.chat.id,
              query.data,
              query.message.message_id,
              query.message.message_id
            );

            // new ApiWeb(this.bot).botButtonsOrderVariant(
            //   query.message.chat.id,
            //   query.data
            // );
            break;
          // для входа в чат
          case "inchat":
            new ApiWeb(this.bot).botButtonsChat(query.from.id, valueCommand);
            console.log(query.from.id, valueCommand);
            break;
          // запросить последний статус
          case "diamond2":
            new ApiWeb(this.bot).botButtonsOrderStatus(
              query.from.id,
              query.data
            );
            break;
          // задать вопрос по заказу
          case "diamond3":
            new ApiWeb(this.bot).botButtonsOrderNumber(
              query.from.id,
              query.data
            );
            break;
          // задать вопрос по заказу
          case "approve":
            await this.bot.deleteMessage(
              query.message.chat.id,
              query.message.message_id
            );

            new ApiWeb(this.bot).botButtonsApprove(
              query.from.id,
              valueCommand,
              valueSecondCommand
            );
            break;
          case "status":
            new ApiWeb(this.bot).botButtonsOrderStatus(
              query.message.chat.id,
              valueCommand
            );
            break;
          case "fast":
            await this.bot.deleteMessage(
              query.message.chat.id,
              query.message.message_id
            );

            new ApiWeb(this.bot).botButtonsOrderFast(
              query.message.chat.id,
              valueCommand
            );
            break;
          default:
            console.log("Кнопка не распознана", query.data);
            break;
        }

        return;
      } catch (error) {
        new LoggerManager().logMessage("error", "error", error.message);
      }
    });
  }
}

module.exports = ButtonsCommand;
