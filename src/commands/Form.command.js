const Api = require("../utils/api/api");
const option_registration = require("../utils/option/options-reg");
const Command = require("./command.class");

class FormCommand extends Command {
  constructor(bot) {
    super(bot)
  }
  handle() {
        this.bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const chatUsername = msg.chat.username;
        
        // проверка заполнено ли имя

        if(!chatUsername) {
          this.requestMessage(chatId, "Вы не можете пользоваться ботом, заполните имя телеграмм" );
           return;
       }



        //this.checkUserName(chatId, chatUsername);


        
        console.log("Работаю");
        const isMessageForm = msg?.web_app_data?.data ? 'form': false;

              

        if(isMessageForm) { 

// закончил тут
          const accaunttlgName = msg?.chat?.username;
          
          
          ///////
const api = new Api(this.bot);

const data = JSON.parse(msg?.web_app_data?.data)  

console.log(msg);

const postData = {
  action: "update",
  name: data?.name,
  tlgName: accaunttlgName,// data?.tlgName,
  number: data?.number,
  tlgId: `${chatId}`,
  role: data?.organization
};

api.postUser(postData);


//this.requestMessage(chatId, "тестовое сообщение");
                      
           
    
            return;
       
    }



      })

      
    }
  }
  
  module.exports = FormCommand;