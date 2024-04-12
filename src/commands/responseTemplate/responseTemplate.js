const copirite_text = require("../../utils/const/copirite_admin");

const responseTemplate = {
    start:
      `Добро пожаловать в бот Сети поминальных залов, меня зовут Аркадий, я могу отправить заявку в сеть поминальных залов.\
          \n \nПо вопросам обработки заказов обращаться ${copirite_text.admin}`, 
  
    help: `Первое что нужно сделать это ЗАРЕГИСТРИРОВАТЬСЯ, для этого нажмите /registration\
          \n \nПо вопросам обработки заказов обращаться ${copirite_text.admin}`, 

    responseToAdminChat: function(numberOrder, message, user) {
        console.log(numberOrder, message, user);
           // определение номера
           let order = numberOrder ? numberOrder: "!Внимание данные не записались в таблицу!";
           // определение текста сообщения
           let tlgMessageId = message.tlgMessageId ? message.tlgMessageId : "не определено" ;//":"1371",
           let tlgId = message.tlgId ? message.tlgId  : "не определено";//":"931824462",
           let form = message.form ? message.form  : "не определено" ;//":"order",           
           let typeOrder;//":"wake",
                switch(message.typeOrder) {
                    case "wake":
                        typeOrder = "поминальные обеды";
                        break;
                    case "feast":
                        typeOrder = "банкет";
                        break;
                    default:
                        typeOrder = "не определено";
                }
           let city = message.city ? message.city : "не определено" ;//":"Москва",
           let timeWake = message.timeWake ? message.timeWake : "не определено" ;//":"9:00-9:30",
           let nameContact = message.nameContact ? message.nameContact : "не определено" ;//":"vvvvvvvvvv",
           let number = message.number ? message.number :  "не определено";//":"89013437024",
           let fio = message.fio ? message.fio : "не определено" ;//":"ddddddddd",
           let dateLeft = message.dateLeft ? message.dateLeft : "не определено" ;//":"2024-03-15",
           let dateWake = message.dateWake ? message.dateWake : "не определено" ;//":"2024-03-16",
           let agentIdSPZ = message.agentIdSPZ ? message.agentIdSPZ : "не определено" ;//":"Добавить"}
           let comment = message.comment  ? message.comment : "комментариев нет" ;

           // определение информации о пользователе (агент или менеджер)
           let spzId = user?.spzId ? user?.spzId : "не определено";
           let name = user?.name ? user?.name : "не определено";
           let tlgName = user?.tlgName ? user?.tlgName : "не определено";
           let sponsor = user?.sponsor ? user?.sponsor : "не определено";

            return `Информация по заявке №${order}: \
            \n \n \
             \n ID агента ${spzId} \
             \n Тип заявки ${typeOrder} \
             \n Город ${city} \
             \n Время прощания  ${timeWake}\
             \n Контактное лицо (Лид) ${nameContact}\
             \n Номер телефона ${number}\
             \n ФИО ${fio}\
             \n Дата смерти ${dateLeft}\
             \n Дата прощания ${dateWake}\            
             \n  Комментарии: ${comment}\             
             \n Куратор @${sponsor}\
            `;
        },


        responseToAgentChat: function(numberOrder, message, user) {
            // определение номера
           let order = numberOrder ? numberOrder: "!Внимание данные не записались в таблицу!";
           // определение текста сообщения
           let tlgMessageId = message.tlgMessageId ? message.tlgMessageId : "не определено" ;//":"1371",
           let tlgId = message.tlgId ? message.tlgId  : "не определено";//":"931824462",
           let form = message.form ? message.form  : "не определено" ;//":"order",           
           let typeOrder;//":"wake",
                switch(message.typeOrder) {
                    case "wake":
                        typeOrder = "поминальные обеды";
                        break;
                    case "feast":
                        typeOrder = "банкет";
                        break;
                    default:
                        typeOrder = "не определено";
                }
           let city = message.city ? message.city : "не определено" ;//":"Москва",
           let timeWake = message.timeWake ? message.timeWake : "не определено" ;//":"9:00-9:30",
           let nameContact = message.nameContact ? message.nameContact : "не определено" ;//":"vvvvvvvvvv",
           let number = message.number ? message.number :  "не определено";//":"89013437024",
           let fio = message.fio ? message.fio : "не определено" ;//":"ddddddddd",
           let dateLeft = message.dateLeft ? message.dateLeft : "не определено" ;//":"2024-03-15",
           let dateWake = message.dateWake ? message.dateWake : "не определено" ;//":"2024-03-16",
           let agentIdSPZ = message.agentIdSPZ ? message.agentIdSPZ : "не определено" ;//":"Добавить"}
           let comment = message.comment  ? message.comment : "комментариев нет" ;

           // определение информации о пользователе (агент или менеджер)
           let spzId = user?.spzId ? user?.spzId : "не определено";
           let name = user?.name ? user?.name : "не определено";
           let tlgName = user?.tlgName ? user?.tlgName : "не определено";
           let sponsor = user?.sponsor ? user?.sponsor : "не определено";

            return `Ваша заявка принята под №${order}: \            
             \n \n Тип заявки ${typeOrder} \
             \n Город ${city} \
             \n Время прощания  ${timeWake}\
             \n Контактное лицо (Лид) ${nameContact}\
             \n Номер телефона ${number}\
             \n ФИО ${fio}\
             \n Дата смерти ${dateLeft}\
             \n Дата прощания ${dateWake}\            
             \n  Комментарии: ${comment}\             
             \n Написать куратору @${sponsor}\
            `;
        },
        
        responseToAdminChatAboutRegostration: function(user) {
           // variant user  {"action":"update","name":"Агент 007","tlgName":"ManagerTest2","number":"89683289173","tlgId":"6136123702","role":"agent"}
           let name = user.name ? user.name : "не определено" ;    
           let tlgName = user.tlgName ?  user.tlgName  : "не определено" ;
           let number = user.number  ? user.number  : "не определено" ;     
           let role = user.role ? user.role  : "не определено" ;

           return `Пользователь внес данные в таблицу пользователей: \            
           \n Имя ${name} \                     
           \n Роль ${role} \
           
          `;
        }
            
            
        
  };

  
  module.exports = responseTemplate;
  