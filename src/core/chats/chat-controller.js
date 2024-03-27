const DataBase = require("../dataBase/dataBase")

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

// создаме чат
async function createChat(orderNumber ='orderNumber', managerId ='orderNumber', agentId='orderNumber') {
    try {
        // запуск по тригеру чат хелпер при изменении статуса __ид____ид____ид - пока нет всех ид не создаем чат ? 
        // уязвимость если менеджер поменяет статус заказа то его ид не отправится в хелпер
        // параметры id заказа, менеджера, агента
        // 1. проверить нет ли номера зака, и если такой есть обновить в нем ид причастных
        // возвращает :

        const sql =
        'INSERT INTO `chats`(`order_number`, `manager_id`, `agent_id`) VALUES (?, ?, ?)';
        const values = [orderNumber, managerId, agentId];
        const result = await new DataBase().query(sql, values);
        await console.log("Тестовый запрос", result[0]);  

    } catch (e) {
        console.error("Ошибка при создании чата", e)
    }
}

// проверка в чате ли агент или менеджер (любой пользователь)
async function checkInChat() {
    try {
        // ищет по id в колонках у менеджера и агента или куратора находится ли он в чате

        // возвращает: id чата или false

    } catch (e) {
        console.error("Ошибка проверка в чате ли пользователь", e)
    }
}



// вход в чат по КНОПКЕ под сообщением
async function toChat() {
    try {

        // принимает номер чата и номер ид пользователя и меняет на true

        // возвращает сообшения из чата, думаю все 

    } catch (e) {
        console.error("Ошибка при получении списка моих чатов", e)
    }
}

// выход из чата по кнопке + при любой команде?
async function leaveChat() {
    try {

        // принимает ид польтзователя ищет во всех полях - куратор - менеджер - агент

        // возвращает сообшения из чата, думаю все 

    } catch (e) {
        console.error("Ошибка при получении списка моих чатов", e)
    }
}

// положить сообщение, думаю просто в массив добавить json не важно от кого не привязывая к id, все равно я имя не смогу подгружить из google sheets
async function putChat() {
    try {

        // принимает json строку и push в текущий массив
        //Возвращает: скорее всего ничего, так как и так вижно в самой переписке


    }catch (e) {
        console.error("Ошибка при редактировании чата", e)
    }
}


// показать мои чаты 
async function getMyChats() {
    try {
        // принимает id и смотрит в каких чатах

        // возвращает id частов и номер от заказа

    } catch (e) {
        console.error("Ошибка при получении списка моих чатов", e)
    }
}

// для механизма согласования
async function getDataChat() {
    try {
        // принимает id заказа

        // возвращает весь заказ как есть 

    } catch (e) {
        console.error("Ошибка при получении списка моих чатов", e)
    }
}



module.exports = {createChat}