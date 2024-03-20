const fs = require("fs");
const Api = require("../utils/api/api");
const AipUse = require("../utils/api/apiUse");
const Bot = require("../bot/Bot");
const RequestInChatAdmin = require("../commands/handle/RequestInChatAdmin");

class Session {
  constructor(bot) {
    this.bot = bot;
    
  }

  handle() {

  }


  getfileJsonFormessage(fileName) {
    if (!fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, "[]", "utf8");
      //  fs.writeFileSync(fileName, JSON.stringify([{ tlgId: 999999999}], null, 2), "utf8");
    }

    const fileContent = fs.readFileSync(fileName, "utf8");
    const session = JSON.parse(fileContent);
    return session;
  }


 async _postSession(postData) {
    // удаляем лишний ключ
    delete postData.step;

    console.log(postData);
    const api = new Api(this.bot);
    const request = await new AipUse(api).updateUser(postData);

    await console.log("Ответ о регистрации", request);
    if(!request) {
      return
   }    

   console.log("request", request);
   console.log("postData", postData);
       await new RequestInChatAdmin(this.bot, request).requestUSer(postData)
       return

    //this.bot.sendMessage(931824462, "ntrcn");


  }

  endSession(fileName, tlgId) {
    // получаем файл
    let file = this.getfileJsonFormessage(fileName);
    // получаем нужный объект
    const itemSession = this.file.find((item) => item.tlgId == tlgId);    
    // фильтруем файд
    const dataSession = this.file.filter((item) => item.tlgId != tlgId);
    // перезаписываем файл
    this.writeTofilesession(fileName, dataSession);
    // отправляем API для записи в google sheets
    this._postSession(itemSession);   
  }

  writeTofilesession(fileName, session) {
    fs.writeFileSync(fileName, JSON.stringify(session, null, 2), "utf8");
  }
}

module.exports = Session;
