//@ts-check

const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;


const TELEGRAMM_MANAGER_GROUP = process.env.TELEGRAMM_MANAGER_GROUP;


const LoggerManager = require("../log/LoggerManager");
const SessionRegistration = require("../session/session.registration");
const Command = require("./command.class");
const SESSION_RESPONSE = require("../session/session.respons");
const SessionOrder = require("../session/session.order");
const { getAllChats } = require("../core/chats/chat-controller");
const ChatHandle = require("../core/chats/chat-handle");
const { responseToManagerChatAboutQuesrion } = require("./responseTemplate/responseTemplate");
class Buttoncommand extends Command {
  constructor(bot) {
    super(bot);
  }

  /**
   * 
   * @param {string} command - ! номер чата из операционки
   * @param {number} chatId 
   * @param {number} messageId 
   * @returns {Promise<boolean>}
   */

  async _checkChat(command, chatId, messageId) {
   const order = await getAllChats();   
   // проверяем есть ли чаты

   if(!order) {
    return false;
   }

   if(!Array.isArray(order[0]) ) {
       return false;
   }

   const findOrder = await order[0].find(item => item.order_number === command);   
   if(!findOrder) {
      return false;
   } else {

    // выходим из предыдущего чата
    await new ChatHandle(this.bot).logoutChat(chatId);
    // устанавливаем чат
    // внутренним методом отправляем сообщение полователю который подключился к чату
    const res = await new ChatHandle(this.bot).toChat(findOrder.order_number, chatId);   
    
    this.bot.editMessageText(`<b>Вы выбрали чат:</b> ${findOrder.lid} ${findOrder.customer_phone}.`, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "HTML"
    });

    
    return true;
   }
      
    
  }

 

  handle() {  
 
    this.bot.on("callback_query", async (query) => {      
      try {
        new LoggerManager().logMessage("log", "bot.on(callback_query)", query);

       // console.log(query);
        let chatId = query.from.id;
        let message = query?.message?.text;
        // так как кнопки динамические, записываю параметры фильтрации как в url после занка ?, далее json объект
        let command = query?.data.split("?")[0];
       
        const messageId = query.message.message_id;

        // проверяем начилие нажатия в чате, кнопки динамические поэтому вынес, вид кнопок набор цифр например 13003
       const isPressChat = await this._checkChat(command, chatId, messageId);

       if(isPressChat) {        
        
        return
       }

        

        //let stepRegistration;
        switch (command) {
          // механизм согласования сообщения от менеджера агенту  
          case "option_btn_approve":

          const res = await new ChatHandle(this.bot).handleApprove(query , messageId); 
            
            return;
            break;
          case "button_status":
            this.requestMessage(
              chatId,
              "Администратору направлен запрос уточнить статус"
            );

            if(!TELEGRAMM_ADMIN_CHAT) {
              return;
            }
            this.requestMessage(
              TELEGRAMM_ADMIN_CHAT,
              `В группу к менеждерам отправлено уведомление о том что нужно уточнить статус \n\n ${message}`
            );

            if(!TELEGRAMM_MANAGER_GROUP) {
              this.requestMessage(
                TELEGRAMM_ADMIN_CHAT,
                `!! Внимание !! в группу менеджеров оповещение не прошло ${message}`
              );
              return;
            }
            this.requestMessage(
              TELEGRAMM_MANAGER_GROUP,
            await responseToManagerChatAboutQuesrion(message)
            );


            return;
            break;
          case "button_reg_employee":
          case "button_reg_agent":
            let reg = new SessionRegistration(query, this.bot).handleButton(
              command,
              chatId,
              messageId
            );
            this.requestMessage(chatId, reg.message, reg.option);
            return;
            break;

          // кнопки по городам
          case "button_order_moscow":
          case "button_order_mo":
          case "button_order_cpb":
          case "button_order_lo":
          case "button_order_nn":

          // кнопки со временем
          case "9:00-9:30":
          case "9:30-10:00":
          case "10:00-10:30":
          case "10:30-11:00":
          case "11:00-11:30":
          case "11:30-12:00":
          case "12:00-12:30":
          case "12:30-13:00":
          case "13:00-13:30":
          case "13:30-14:00":
          case "14:00-14:30":
          case "14:30-15:00":
          case "15:00-15:30":
          case "15:30-16:00":
          case "16:00-16:30":
          case "16:30-17:00":
          case "17:00-17:30":
          case "17:30-18:00":
          case "18:00-18:30":
          case "18:30-19:00":
          case "19:00-19:30":
          case "19:30-20:00":
          case "20:00-20:30":
          case "20:30-21:00":
          case "21:00-21:30":
          case "21:30-22:00":
          case  "option_data_dateLeft_empty":
          case "option_data_dateWake_empty":
          case "button_order_comment_empty":
          case "button_order_place_wake_empty":
          case "button_order_fio_empty":
          case  "option_order_timeWake_empty":
          case "option_order_others_empty":
            let order = new SessionOrder(query, this.bot).handleButton(
              command,
              chatId,
              messageId
            );
            console.log(order);
            this.requestMessage(chatId, order.message, order.option);
            return;
            break;

          default:
            return;
            break;
        }
      } catch (error) {
        new LoggerManager().logMessage("error", "error", error.message);
      }
    });
  }
}

module.exports = Buttoncommand;
