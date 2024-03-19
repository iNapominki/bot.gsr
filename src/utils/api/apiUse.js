class AipUse {
  constructor(api) {
    this.api = api;
  }

  async updateUser(postData) {
    
    
    let res = await this.api.updateUser(postData);
    if(!res) {
      return
    }
    if (res.result.code === 200) {
      const { result } = res;
      const { message } = result;
      return message;
    } else if (res.result.code === 403) {
      const { tlgId } = postData;
      this.api.requestMessageOnApi(
        tlgId,
        "Данный номер телефона не зарегистрирован, пожалуйста обратитесь к администратору"
      );
      return false;
    } else {
      const { tlgId } = postData;
      this.api.requestMessageOnApi(
        tlgId,
        "Регистрация не удалась, обратитесь к администратору"
      );
      return false;
    }
  }

  async checkUser(postData) {
    console.log("AipUse checkUser", postData);
    let res = await this.api.checkUser(postData);
    if(!res) {
      return
    }
    if (res.result.code === 200) {
      const { result } = res;
      const { message } = result;
      return message;
    } else if (res.result.code === 403) {
      const { tlgId } = postData;
      this.api.requestMessageOnApi(
        tlgId,
        res.result.message
      );
      return false;
    } else {
      const { tlgId } = postData;
      this.api.requestMessageOnApi(
        tlgId,
        "Произошла ошибка, обратитесь к администратору"
      );
      return false;
    }

  }


}

module.exports = AipUse;
