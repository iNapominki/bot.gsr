const DataBase = require("../dataBase/dataBase");

// тестирование
// async function test() {
//     try {
//         let sql = 'SELECT * from chats;'
//         const result = await new DataBase().query(sql);
//         await console.log("Тестовый запрос", result[0]);

//     } catch (e) {
//         console.error("Ошибка при тестовом запросе", e)
//     }
// }

async function getOrderForNumber(order = "ошибка") {
  //1 проверяем нет ли в базе данных номера с такой заявкой
  const sql = "SELECT * FROM chats WHERE order_number = ?";
  const res = await new DataBase().query(sql, [order]);
  return res;
}

// создаме чат
async function createChat(
  orderNumber = "ошибка",
  managerId = "ошибка",
  agentId = "ошибка"
) {
  try {
    // возвращает : id в базе данных и номер заказа из операционки
    // если такого канала нет создает новый
    const sql =
      "INSERT INTO `chats`(`order_number`, `manager_id`, `agent_id`) VALUES (?, ?, ?)";
    const values = [orderNumber, managerId, agentId];
    const result = await new DataBase().query(sql, values);
    const selectSql = "SELECT * FROM chats WHERE id = ?";
    const res = await new DataBase().query(selectSql, [result[0].insertId]);
    return res;
  } catch (e) {
    console.error("Ошибка при создании чата", e);
  }
}

// показать мои чаты
async function getMyChats(chatId) {
  try {
    //1 проверяем нет ли в базе данных номера с такой заявкой
    const sql =
      "SELECT * FROM `chats` WHERE `manager_id` = ? OR `agent_id` = ?";
    const res = await new DataBase().query(sql, [chatId, chatId]);
    return res;

    // принимает id и смотрит в каких чатах
    // возвращает id частов и номер от заказа
  } catch (e) {
    console.error("Ошибка при получении списка моих чатов", e);
  }
}

// получить все чаты, для формирования команд кнопок
async function getAllChats() {
    try {      
      const sql =
        "SELECT `order_number` FROM `chats`";
      const res = await new DataBase().query(sql, []);
      return res;  
      // возвращет все номера заказов
    } catch (e) {
      console.error("Ошибка при получении списка моих чатов", e);
    }
  }



// вход в чат по КНОПКЕ под сообщением
async function toChat(order = "ошибка", chatId = "ошибка") {
  try {

    


    const sql = "UPDATE `chats` SET manager_in_chat = IF(manager_id = ? AND agent_id != ?, NOT manager_in_chat, manager_in_chat), agent_in_chat = IF(agent_id = ? AND manager_id != ?, NOT agent_in_chat, agent_in_chat) WHERE order_number = ?";
 
     const res = await new DataBase().query(sql, [chatId, chatId, chatId, chatId, order]);

     console.log("res", res)
     console.log("toChat", order, chatId)
  return res;  



    
    // принимает номер чата и номер ид пользователя и меняет на true
    // возвращает сообшения из чата, думаю все
  } catch (e) {
    console.error("Ошибка при получении списка моих чатов", e);
  }
}

// проверка в чате ли агент или менеджер (любой пользователь)
async function checkInChat() {
    try {
      // ищет по id в колонках у менеджера и агента или куратора находится ли он в чате
      // возвращает: id чата или false
    } catch (e) {
      console.error("Ошибка проверка в чате ли пользователь", e);
    }
  }

// выход из чата по кнопке + при любой команде?
async function leaveChat() {
  try {
    // принимает ид польтзователя ищет во всех полях - куратор - менеджер - агент
    // возвращает сообшения из чата, думаю все
  } catch (e) {
    console.error("Ошибка при получении списка моих чатов", e);
  }
}

// положить сообщение, думаю просто в массив добавить json не важно от кого не привязывая к id, все равно я имя не смогу подгружить из google sheets
async function putChat() {
  try {
    // принимает json строку и push в текущий массив
    //Возвращает: скорее всего ничего, так как и так вижно в самой переписке
  } catch (e) {
    console.error("Ошибка при редактировании чата", e);
  }
}

// для механизма согласования
async function getDataChat() {
  try {
    // принимает id заказа
    // возвращает весь заказ как есть
  } catch (e) {
    console.error("Ошибка при получении списка моих чатов", e);
  }
}

module.exports = { createChat, getOrderForNumber, getMyChats, getAllChats, toChat };
