const {
  createChat,
  getOrderForNumber,
  getMyChats,
  toChat,
} = require("./chat-controller");

class ChatHandle {
  constructor() {}

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

    return { status: true, button: res[0], message: "Перейдите в чат по номеру заказа" };
  }

  async toChat(order, chatId) {
    const res = await toChat(order, chatId);
  }
}

module.exports = ChatHandle;
