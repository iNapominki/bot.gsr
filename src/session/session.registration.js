//const fs = require('fs');
const Session = require("./session");
const SESSION_RESPONSE = require("./session.respons");

class SessionRegistration extends Session {
  constructor(msg, bot) {
    super(bot);
    this.FileName = "registration.json";
    this.message = [];
    this.file = this.getfileJsonFormessage(this.FileName);
    this.step = 0;
    this.msg = msg;
    this.tlgId = `${this.msg.from.id}`;
    this.tlgName = this.msg.from.username;
  }

  _writeToFile(data, session) {
    // собираем данные другие сесии + новая и записываем обновленный файл
    data.push(session);

    return this.writeTofilesession(this.FileName, data);
  }

  _validationValueMessage(value, step) {
    console.log("validationMessage", value, step);
    console.log(SESSION_RESPONSE.REG[step].validation(value));
    return SESSION_RESPONSE.REG[step].validation(value);
  }

  _getTitleStep(step) {
    return SESSION_RESPONSE.REG[step].title;
  }

  createSession() {
    if (this.file.length < 1) {
      // [] это для первого значения, если сессий нет
      // собираем сессию
      const session = {
        action: "update",
        tlgId: this.tlgId,
        tlgName: this.tlgName,
        step: this.step,
      };
      this._writeToFile([], session);
      let message = this._getTitleStep(this.step);
      return { step: this.step, message: message, option: {} };
    }

    const itemSession = this.file.find((item) => item.tlgId == this.tlgId);

    if (itemSession) {
      console.log(itemSession.step);
      let message = this._getTitleStep(itemSession.step);
      return { step: itemSession.step, message: message, option: {} };
    } else {
      // собираем сессию
      const session = {
        action: "update",
        tlgId: this.tlgId,
        tlgName: this.tlgName,
        step: this.step,
      };
      this._writeToFile(this.file, session);
      let message = this._getTitleStep(this.step);
      return { step: this.step, message: message, option: {} };
    }
  }

  // обновление сессии
  handleSession() {
    const itemSession = this.file.find((item) => item.tlgId == this.tlgId);
    const dataSession = this.file.filter((item) => item.tlgId != this.tlgId);

    if (itemSession) {
      let step = itemSession.step;
      let { text } = this.msg;
      let message;
      let validationMessage;
      switch (step) {
        case 0:
          validationMessage = this._validationValueMessage(text, step);
          if (validationMessage) {
            message = this._getTitleStep(itemSession.step);
            return { step: 1, message: validationMessage, option: {} };
          }

          itemSession.step = 1;
          itemSession.name = text;
          this._writeToFile(dataSession, itemSession);

          message = this._getTitleStep(itemSession.step);
          return { step: 1, message: message, option: {} };

          break;
        case 1:
          validationMessage = this._validationValueMessage(text, step);

          if (validationMessage) {
            message = this._getTitleStep(itemSession.step);
            return { step: 1, message: validationMessage, option: {} };
          }
          itemSession.step = 2;
          itemSession.number = text;
          this._writeToFile(dataSession, itemSession);

          message = this._getTitleStep(itemSession.step);
          let option = SESSION_RESPONSE.REG[itemSession.step].option;

          return { step: 2, message: message, option: option };

          break;

        default:
          // выполнится, если ни один другой случай не сработал
          console.log("Что делать незнаю");
          break;
      }

      return itemSession;
    } else {
      return {
        step: 3,
        message: "Команда не распознана (сессия регистрации)",
        option: {},
      };
    }
  }

  handleButton(command, chatId) {
    const itemSession = this.file.find((item) => item.tlgId == chatId);
    const dataSession = this.file.filter((item) => item.tlgId != chatId);

    if (itemSession) {
      switch (command) {
        case "button_employee":
          itemSession.step = 3;
          itemSession.role = "employee";
          this._writeToFile(dataSession, itemSession);
          this.endSession(this.FileName, chatId);

          return { step: 3, message: this._getTitleStep(3), option: {} };
          break;
        case "button_agent":
          itemSession.step = 3;
          itemSession.role = "agent";
          this._writeToFile(dataSession, itemSession);
          // завершение сесии
          this.endSession(this.FileName, chatId);

          return { step: 3, message: this._getTitleStep(3), option: {} };
          break;
        default:
          console.log("Что делать незнаю");
          // выполнится, если ни один другой случай не сработал
          break;
      }
      return itemSession;
    } else {
      return {
        step: 3,
        message: "Команда не распознана (сессия регистрации)",
        option: {},
      };
    }
  }
}

module.exports = SessionRegistration;
