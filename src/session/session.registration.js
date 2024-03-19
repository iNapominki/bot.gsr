//const fs = require('fs');
const Session = require("./session");

class SessionRegistration extends Session {
  constructor(msg) {
    super();
    this.FileName = "registration.json";
    this.message = [];
    this.file = this.getfileJsonFormessage(this.FileName);
    this.step = 0;
    this.msg = msg;
    this.tlgId = this.msg.from.id;
    this.tlgName = this.msg.from.username;
  }

  _writeToFile(data, session) {
    
    // собираем данные другие сесии + новая и записываем обновленный файл
    data.push(session);

    return this.writeTofilesession(this.FileName, data);
  }

  createSession() {
//console.log("ss")
    
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
      return this.step;
    }

    const itemSession = this.file.find((item) => item.tlgId == this.tlgId);

    
//return 1
    if (itemSession) {
      console.log(itemSession.step)
      return itemSession.step;
    } else {

      // собираем сессию
    const session = {
      action: "update",
      tlgId: this.tlgId,
      tlgName: this.tlgName,
      step: this.step,
    };
      this._writeToFile(this.file, session);
      return this.step;
    }
  }

  // обновление сессии
handleSession() {

    const itemSession = this.file.find((item) => item.tlgId == this.tlgId);
    const dataSession = this.file.filter((item) => item.tlgId != this.tlgId);
  
    if (itemSession) {
        let step = itemSession.step;
        let { text } = this.msg;
        switch (step) {
            case 0:
              itemSession.step = 1;
              itemSession.name = text;                
              this._writeToFile(dataSession, itemSession);              
                console.log('Вносим имя');
                return 1;             
              break
            case 1:

              itemSession.step = 2;
              itemSession.number = text;                
              this._writeToFile(dataSession, itemSession);
              console.log('Вносим телефон')
              return 2;   
              break
            case 2:
              itemSession.step = 3;
              itemSession.name = text;                
              this._writeToFile(dataSession, itemSession);
              return 3;  
              console.log('ВНосим роль')
              break            
            default:
              // выполнится, если ни один другой случай не сработал
              console.log('Что делать незнаю')
              break
          }        


      return itemSession;
    } else {
      return 404;
    }

}

handleButton(command, chatId) {

  const itemSession = this.file.find((item) => item.tlgId == chatId);
  const dataSession = this.file.filter((item) => item.tlgId != chatId);

  if (itemSession) {
   // let step = itemSession.step;    
    switch (command) {
        case "button_emploee":
          itemSession.step = 3;
          itemSession.role = "emploee";                
          this._writeToFile(dataSession, itemSession);              
            console.log('Вносим имя');
            return 4;             
          break
        case "button_agent":

          itemSession.step = 3;
          itemSession.role = "agent";                
          this._writeToFile(dataSession, itemSession);
          console.log('Вносим телефон')
          return 4;   
          break                  
        default:
          // выполнится, если ни один другой случай не сработал
          console.log('Что делать незнаю')
          break
      }
  return itemSession;
} else {
  return 404;
}



}

}



module.exports = SessionRegistration;

// dataFormToQuery.action = data.form;
// dataFormToQuery.name = data.name;
// dataFormToQuery.tlgName = this.message.from.username;
// dataFormToQuery.number = data.number;
// dataFormToQuery.tlgId = `${this.message.from.id}`;
// dataFormToQuery.role = data.role;