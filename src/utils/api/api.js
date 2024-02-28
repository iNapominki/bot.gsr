
const GOOGLE_SHEETS_KEY_USERS = process.env.GOOGLE_SHEETS_KEY_USERS;
const fetch = require('node-fetch');

class Api {
    constructor(bot) {
        this.bot = bot;
    }


    async postUser(postData) {

      console.log(postData);

      //return;
        try {
          const response = await fetch(`${GOOGLE_SHEETS_KEY_USERS}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          });

          
      
           let manager = await response.json();
      console.log(manager, "ответ 1");
      //     if (response.status === 200) {
           
      // console.log(manager, 200)
      //       return;
      //     } else {
            
      //       console.log(manager, "не 200")
      //       return;
      //     }
        } catch (error) {
          console.error("Ошибка при выполнении запроса:", error);
        }
      }






}

module.exports = Api;