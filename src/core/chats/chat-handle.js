//const option_btn_approve = require("../../utils/option/option_btn_approve");
const Api = require("../../utils/api/api");
const AipUse = require("../../utils/api/apiUse");
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



  async createChat(orderNumber, managerId, agentId, customer) {
    // проверяем уникальный ли ордер
    const order = await getOrderForNumber(orderNumber);
    // если не уникальный то прерываем
    if (!order[0].length == 0) {
      return { status: false };
    }
    // если уникальный создаем
    const res = await createChat(orderNumber, managerId, agentId, customer);
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


  async _useCheskUser(tlgId) {
    let checkPost = {
      action: "check",
      tlgId: `${tlgId}`,
    };
    const api = new Api(this.bot);
    const request = await new AipUse(api).checkUser(checkPost);

    if (!request) {
      return;
    }

    return request;
  }

  async _getInfoAboutUsers(manager_id, agent_id, pleaseWait, chatId) {    
    const manager = await this._useCheskUser(manager_id);
    const agent = await this._useCheskUser(agent_id);
   // await  this.bot.editMessageText(chatId, pleaseWait.message_id);

 await  this.bot.editMessageText(`теперь можете писать.`, {
    chat_id: chatId,
    message_id: pleaseWait.message_id,
  });
    return {manager, agent};
  }

  // подгрузка сообщений в чат 
  async _sendAllMessages(order, chatId) {
    try {
      //получаем заказ
      const dataOrder = await getOrderForNumber(order);
      const { msg_text, manager_id, agent_id, customer_phone } = dataOrder[0][0];
      const parsData = JSON.parse(msg_text);
      // механизм отложенной загрузки

      const pleaseWait = await this.bot.sendMessage(chatId, "Идет загрузка данных. Пожалуйста, подождите...", {});

      const {manager, agent} = await this._getInfoAboutUsers(manager_id, agent_id, pleaseWait, chatId);
      
      // показ номера телефона заказчика по номеру заказа

      this.requestMessage(chatId, `Номер телефона заказчика по данному заказу ${customer_phone}`);
      //console.log("manager, agent", manager, agent);
      // преобразование несколько раз из за формата хранения в базе данных      
      parsData.forEach((element) => {
        try {
          // обязательно условия для распарсивания
        const msgSrting = element.replace(/'/g, '"');  
          const dataMessage = JSON.parse(msgSrting);          

          const unixTime = dataMessage.date * 1000; // Умножаем на 1000, так как Unix-время измеряется в секундах, а объект Date ожидает миллисекунды
          const date = new Date(unixTime);
          // Получаем удобочитаемую строку с датой и временем для России
          const options = { timeZone: 'Europe/Moscow', hour12: false }; // Устанавливаем часовой пояс и формат времени
          // Получаем удобочитаемую строку с датой
          const readableDate = date.toLocaleString('ru-RU', options);         
          
          // отправляем все сообщения по очереди
          // проверка одобрен ли чат админом, (от менеджера сообщения должны быть одобрены, от агента нет)
          if(!dataMessage.approve) {
            return;
          }

          // формируем от          
          //manager, agent
          const fromNmae = dataMessage?.from?.id == manager?.tlgId ? manager?.spzId : dataMessage?.from?.id == agent?.tlgId ? agent?.spzId : "Пользователь не определен";

          this.requestMessage(chatId, `${readableDate} от ${fromNmae} : ${dataMessage.text}`, {});
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
     // console.log("Проверка чатов", chatId);

      // проверяем есть ли вообще чаты
      const chats = await getMyChats(chatId);
      if (chats[0].length == 0) {        
        return { status: false, message: "У вас чатов нет" };
      }

      // если чаты есть получаем роль из первого чата
      // получаем любой чат считаем что менеджер не может быть агентом
      const firstOrder = chats[0][0];      

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
