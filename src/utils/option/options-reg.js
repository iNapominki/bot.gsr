
let webAppUrl = process.env.WEBAPPURL;

const option_registration = {
    reply_markup: {
      keyboard: [    //inline_   
        [{ text: "Форма (Регистрации/Заявки/Сообщения)" , web_app: {url: webAppUrl}}],
        
      ],    
    },
  };


  module.exports = option_registration;