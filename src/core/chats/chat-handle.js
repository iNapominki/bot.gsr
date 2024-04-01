//const option_btn_approve = require("../../utils/option/option_btn_approve");
const optionBtnApprove = require("../../utils/option/option_btn_approve");
const optionToChat = require("../../utils/option/option_to_chat");
const parsQueryButton = require("../../utils/shared/parsQueryButton");
const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;
const {
  createChat,
  getOrderForNumber,
  getMyChats,
  toChat,
  checkInChat,
  writeToChat,
  logoutChat,  
} = require("./chat-controller");

class ChatHandle {
  constructor(bot) {
    this.bot = bot;
  }

  requestMessage(chatId, message, option) {
    try {
      setTimeout(async () => {
      await this.bot.sendMessage(chatId, message, option);
    }, 500);
    } catch (e) {
      console.error(e);
    }
    
  }



  // процесс согласования ответа от менеджера

  async handleApprove (query , messageId) {

    try{

    const dataQuery = parsQueryButton(query);    

    const {approve, message_id, order_number} = dataQuery;  
    
    // готовим кнопки
    const option = optionToChat(order_number);

    // получаем заказ
    const order = await getOrderForNumber(order_number);
    // проверяем есть ли такой заказ
    if (order[0].length == 0) {
      return { status: false };
    }
    // получаем все сообщения
    const allMessages = order[0][0].msg_text;


   const objAllMessages = await JSON.parse(allMessages); 

   objAllMessages.forEach((element) => {
    // обязательно условия для распарсивания
    const msgSrting = element.replace(/'/g, '"');  
    const dataMessage = JSON.parse(msgSrting);

    

    if(dataMessage.message_id == message_id) {

      dataMessage.approve = approve;  
    // нашли сообщение которое нужно согласовать 

    if(approve) {

      this.bot.editMessageText(`Вы согласовали сообщение по номеру заказа ${order_number} : ${dataMessage.text}`, {
        chat_id: TELEGRAMM_ADMIN_CHAT,
        message_id: messageId,
      });

       
       this.requestMessage(order[0][0].agent_id, `По заказу № ${order_number}, новое сообщение`, option );



      writeToChat(order_number, dataMessage);
    } else {

      this.requestMessage(order[0][0].manager_id, `По заказу № ${order_number}, сообщение несогласовано, вот его содержимое ${dataMessage.text}`, option );

      this.bot.editMessageText(`Вы не согласовали сообщение по номеру заказа ${order_number} : ${dataMessage.text}`, {
        chat_id: TELEGRAMM_ADMIN_CHAT,
        message_id: messageId,
      });

    }
       

       

    }    
   })    

  } catch (e) {
    console.error(e);
  }


  }



  async createChat(orderNumber, managerId, agentId) {
    // проверяем уникальный ли ордер
    const order = await getOrderForNumber(orderNumber);
    // если не уникальный то прерываем
    if (!order[0].length == 0) {
      return { status: false };
    }
    // если уникальный создаем
    const res = await createChat(orderNumber, managerId, agentId);
    return { status: true, id: res[0][0].id, order: res[0][0].order_number };
  }

  async getMyChats(chatId) {
    const res = await getMyChats(chatId);
    if (res[0].length == 0) {
      return { status: false, message: "У вас чатов нет" };
    }

    return {
      status: true,
      button: res[0],
      message: "Перейдите в чат по номеру заказа",
    };
  }

  async _sendAllMessages(order, chatId) {
    try {
      //получаем заказ
      const dataOrder = await getOrderForNumber(order);
      const { msg_text } = dataOrder[0][0];
      const parsData = JSON.parse(msg_text);
      // преобразование несколько раз из за формата хранения в базе данных
      parsData.forEach((element) => {
        // обязательно условия для распарсивания
        const msgSrting = element.replace(/'/g, '"');       

        try {
          const dataMessage = JSON.parse(msgSrting);
          // отправляем все сообщения по очереди          

          // проверка одобрен ли чат админом, (от менеджера сообщения должны быть одобрены, от агента нет)
          if(!dataMessage.approve) {
            return;
          }

          this.requestMessage(chatId, dataMessage.text, {});
        } catch (e) {
          this.requestMessage(
            chatId,
            "в сообщении недопустимый знак (кавычки одинарные или двойные) ",
            {}
          );
          console.error(e);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  async toChat(order, chatId) {
    //получаем заказ
    const dataOrder = await getOrderForNumber(order);

    function getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] == value);
    }
    // определяем кто сделал запрос менеджер или агент
    const role = await getKeyByValue(dataOrder[0][0], chatId);

    // устанавливаем значение чата true значение
    const res = await toChat(order, role);

    this._sendAllMessages(order, chatId);

    return res;
  }

  async checkInChat(chatId) {
    try {
      console.log("Проверка чатов", chatId);

      // проверяем есть ли вообще чаты
      const chats = await getMyChats(chatId);
      if (chats[0].length == 0) {
        console.log(" чатов нет");
        return { status: false, message: "У вас чатов нет" };
      }

      // если чаты есть получаем роль из первого чата
      // получаем любой чат считаем что менеджер не может быть агентом
      const firstOrder = chats[0][0];

      //const dataOrder = await getOrderForNumber(firstOrder, chatId);

      function getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key] == value);
      }
      // определяем кто сделал запрос менеджер или агент
      const role = await getKeyByValue(firstOrder, chatId);

      // проверка чатов
      const res = await checkInChat(role, chatId);

      if (res[0].length == 0) {
        return { status: false, message: "нет открытых чатов", activChats: "" };
      } else {
        return {
          status: true,
          message: "",
          activChats: res[0][0].order_number,
        };
      }
    } catch (e) {
      console.error(e);
    }
  }

  async writeToChat(chatNumber, msg) {

    
    try {
      //получаем заказ

      const from = msg.from.id;
      const dataOrder = await getOrderForNumber(chatNumber);     

      const option = optionToChat(chatNumber);
      // 1 смотри кто написал, и если отправляем на противоположную роль
      //1.1 агент менеджеру
      if (from != dataOrder[0][0].manager_id) {
        try{
           this.requestMessage(
          dataOrder[0][0].manager_id,
          `Новое сообщение в чате ${chatNumber}: ${msg.text}`,
          option
        );

        this.requestMessage(TELEGRAMM_ADMIN_CHAT, `Агент написал менеджеру по номеру заказа ${dataOrder[0][0].order_number}: ${msg.text}`, {} );
        msg.approve = true;

        writeToChat(chatNumber, msg);
        } catch (e) {
          console.error(e)
        }
       
      }
    // 1.2 менеджер агенту
      if (from != dataOrder[0][0].agent_id) {
        try{
        // this.requestMessage(
        //   dataOrder[0][0].agent_id,
        //   `Новое сообщение в чате ${chatNumber}:  ${msg.text}`,
        //   option
        // );

        const option = optionBtnApprove({message_id: msg.message_id, order_number:dataOrder[0][0].order_number });

        this.requestMessage(TELEGRAMM_ADMIN_CHAT, `Менеджер написал агенту по номеру заказа ${dataOrder[0][0].order_number}: ${msg.text}`, option);

        msg.approve = false;
        writeToChat(chatNumber, msg);

      } catch (e) {
        console.error(e)
      }
      }


      
    } catch (e) {
      console.error(e);
    }
  }

  async logoutChat(chatId) {
    //получаем все заказы
    const dataOrder = await getMyChats(chatId);
    if (dataOrder[0].length == 0) {
      return {
        status: false,
        message: "У вас чатов по заказам нет",
        activChats: "",
      };
    }

    function getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] == value);
    }
    // определяем кто сделал запрос менеджер или агент
    const role = await getKeyByValue(dataOrder[0][0], chatId);

    const res = await logoutChat(chatId, role);

    return {
      status: true,
      message: "Вы вышли из чата, и можете оформить заказ /order",
      activChats: "",
    };
  }
}

module.exports = ChatHandle;
