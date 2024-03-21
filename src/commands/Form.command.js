const LoggerManager = require("../log/LoggerManager");
const SessionRegistration = require("../session/session.registration");
const Api = require("../utils/api/api");
const option_registration = require("../utils/option/options-reg");
const Command = require("./command.class");
const HandleForm = require("./handle/HandleForm");
const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;
const SESSION_RESPONSE = require("../session/session.respons");
const SessionOrder = require("../session/session.order");

class FormCommand extends Command {
  constructor(bot) {
    super(bot);
  }
  handle() {
    this.bot.on("message", async (msg) => {

      try {
     
      new LoggerManager().logMessage("log", "bot.on(message)", msg);
      const chatId = msg.chat.id;
      const chatUsername = msg.chat.username;
      const isMessageForm = msg?.web_app_data?.data ? "form" : false;

      if (msg.text === "/start") {
        return;
      }
      if (msg.text === "/help") {
        return;
      }
      if (msg.text === "/form") {
        return;
      }

      if (msg.text === "/registration") {
        return;
      }

      if (msg.text === "/order") {
        return;
      }

      if(msg.text === "/clear") {
        return;
      }
      if (msg.chat.id == TELEGRAMM_ADMIN_CHAT) {
        this.requestMessage(
          chatId,
          "В этот чат может писать только бот"
        );
        return;
      }

      let isCheckUserName = this.checkUserName(chatId, chatUsername);
      if (!isCheckUserName) {
        return;
      }


/** начинаем проверять сессии, если есть то 
 * ловим данные, приоритет у регистрации, 
 * если есть незакрая сессия у регистрации 
 * то обрабатывается на */ 


      // let stepRegistration = new SessionRegistration(msg, this.bot).handleSession();
      // let option = SESSION_RESPONSE.REG[stepRegistration]?.option; 
      // this.requestMessage(chatId, SESSION_RESPONSE.REG[stepRegistration].title, option);

      let {step, message, option, status} = new SessionRegistration(msg, this.bot).handleSession();      
      if(status == true) {
         this.requestMessage(chatId, message, option);
         console.log("сессия по регистрации");
        return;
      } else {

        console.log("сессия по заявке");
        let {step, message, option} = new SessionOrder(msg, this.bot).handleSession();
        this.requestMessage(chatId, message, option);
        return;
      }
      

      
      


      this.requestMessage(
        chatId,
        "Я не знаю что нужно сделать обратитесь к администратору"
      );


      return;

      if (!isMessageForm) {
        this.requestMessage(
          chatId,
          "Вы не можете отправлять сообщения, для взаимодействия заполните необходимую форму"
        );
        return;
      }
      console.log("Обработка формы");


      this.requestMessage(
        chatId,
        "Ваша заявка обрабатывается, если не пришел ответ пожалуйста обратитесь к администратору"
      );

      try {



        const handleForm = new HandleForm(this.bot, msg);
        handleForm.start();
      } catch (e) {
        console.log("NEW ERROR", e);
        this.requestMessage(
          chatId,
          `Проблемы с отправкой формы, попробуйте еще или обратитесь к администратору. Текст ошибки и класс: ${e.message}`
        );
        new LoggerManager().logMessage("error", "Проблема с отправкой формы", e.message);
        return;
      }

    } catch (error) {
      new LoggerManager().logMessage("error", "error", error.message);
      //console.log(error);
    }
    });
  }
}

module.exports = FormCommand;
