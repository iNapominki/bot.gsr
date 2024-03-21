const fs = require("fs");
const Api = require("../utils/api/api");
const AipUse = require("../utils/api/apiUse");
const Bot = require("../bot/Bot");
const RequestInChatAdmin = require("../commands/handle/RequestInChatAdmin");

class Session {
  constructor(bot) {
    this.bot = bot;
  }

  clearSession(fileName, tlgId) {
    let file = this.getfileJsonFormessage(fileName);
    // получаем нужный объект
    const itemSession = file.find((item) => item.tlgId == tlgId);

    console.log(itemSession);

    if(!itemSession) {
      return "Данных для очистки нет, для оформления заказа введите /order"
    }
    // фильтруем файд
    const dataSession = file.filter((item) => item.tlgId != tlgId);
    // перезаписываем файл
    this.writeTofilesession(fileName, dataSession);
    return "Данных по заказу сброшены, для оформления нового заказа введите /order"

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

  async _postSession(postData, apiUseMethod, requestMethod) {

   
    // удаляем лишний ключ
    delete postData.step;   

    const api = new Api(this.bot);
    const request = await new AipUse(api)[apiUseMethod](postData); // updateUser

    if (!request) {
      return;
    }

    await new RequestInChatAdmin(this.bot, request)[requestMethod](postData);
    return;
  }


  async _postSessionUser(postData) {   
    // удаляем лишний ключ
    delete postData.step;   

    const api = new Api(this.bot);
    const request = await new AipUse(api).updateUser(postData); // updateUser

    if (!request) {
      return;
    }
    
    await new RequestInChatAdmin(this.bot, request).requestUSer(postData);
    return;
  }

  async _postSessionOrder(postData) {    
    // удаляем лишний ключ
    delete postData.step;
    
    let checkPost = {
      action: "check",
      tlgId: postData.tlgId,
    };

     const api = new Api(this.bot);
    const user = await new AipUse(api).checkUser(checkPost);

    if (!user) {
      return;
    }
    
    const request = await new AipUse(api).postOrder(postData); // updateUser
    if (!request) {
      return;
    }
    // const api = new Api(this.bot);
    // const { tlgId } = post;
    // let checkPost = {
    //   action: "check",
    //   tlgId: tlgId,
    // };
    // let user = await api.checkUser(checkPost);
    // if (user) {
    //   const request = await api.postOrder(post);     
    //   await new RequestInChatAdmin(this.bot, request).requestOrder(post, user)
    //   return;
    // }  
    
    await new RequestInChatAdmin(this.bot, request).requestOrder(postData, user);
    return;
  }


  _cheskParam(message) {
    console.log(`В функции endSession Отсутствует параметр ${message}`);
    throw new Error(`В функции endSession Отсутствует параметр ${message}`);    
  }

  endSession(fileName, tlgId, type = this._cheskParam("type") ) {

    console.log("endSession");
    // получаем файл
    let file = this.getfileJsonFormessage(fileName);
    // получаем нужный объект
    const itemSession = this.file.find((item) => item.tlgId == tlgId);
    // фильтруем файд
    const dataSession = this.file.filter((item) => item.tlgId != tlgId);
    // перезаписываем файл
    this.writeTofilesession(fileName, dataSession);
    // отправляем API для записи в google sheets
    // выбираем что постим пользователя или заказ

    if(type == "order") {
      this._postSessionOrder(itemSession);

    } else if (type == "user") {
      this._postSessionUser(itemSession);
    } else {

      console.error("Не определен тим заказ или пользователь в функции endSession")

    }
    
  }

  writeTofilesession(fileName, session) {
    fs.writeFileSync(fileName, JSON.stringify(session, null, 2), "utf8");
  }
}

module.exports = Session;
