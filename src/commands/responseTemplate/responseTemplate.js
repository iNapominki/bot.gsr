const responseTemplate = {
    start:
      "Добро пожаловать в бот Сети поминальных залов, меня зовут Аркадий, я могу отправить заявку в сеть поминальных залов.\
          \n \nПо вопросам обработки заказов обращаться по телефону 8 916 569 26 73 (Андрей)  \
          \n \n Первое что нужно сделать это <b>ЗАРЕГИСТРИРОВАТЬСЯ</b>\
          \n \n <b>РЕГИСТРАЦИЯ</b>\
          \n\nДля регистрации введите ключевое слово /reg далее внесите ваше имя, номер телефона.\
          \n\n <b>ПРИМЕР</b> регистрации:\
          \n\n /reg Аркадий, 89012535226\
          \n \n<b>ПРИМЕЧАНИЕ</b>\
          \n\n / -  обязательная команда для бота\
          \n reg - команда регистрации\
          \n \n Для оформления заявки отправьте мне текст заявки по форме:\
          \n  1. Имя заказчика\
          \n  2. Телефон заказчика\
          \n  <b>3. ФИО усопшего</b>\
          \n  4. Дата прощания\
          \n  5. Время захоронения/кремации\
          \n  6. Доп. информация:  кладбище/крематорий. Локация. И т.д.",
  
    help: "Первое что нужно сделать это <b>ЗАРЕГИСТРИРОВАТЬСЯ</b>\
          \n \nПо вопросам обработки заказов обращаться по телефону 8 916 569 26 73 (Андрей)  \
          \n \n <b>РЕГИСТРАЦИЯ</b>\
          \n\nДля регистрации введите ключевое слово /reg далее внесите ваше имя, номер телефона.\
          \n\n <b>ПРИМЕР</b> регистрации:\
          \n\n /reg Аркадий, 89012535226\
          \n \n<b>ПРИМЕЧАНИЕ</b>\
          \n\n / -  обязательная команда для бота\
          \n reg - команда регистрации\
          \n \n Для оформления заявки отправьте мне текст заявки по форме:\
          \n  1. Имя заказчика\
          \n  2. Телефон заказчика\
          \n  <b>3. ФИО усопшего</b>\
          \n  4. Дата прощания\
          \n  5. Время захоронения/кремации\
          \n  6. Доп. информация:  кладбище/крематорий. Локация. И т.д.",

    responseToAdminChat: function(numberOrder, message, user) {
           // определение номера
           let order = numberOrder ? numberOrder: "!Внимание данные не записались в таблицу!";
           // определение текста сообщения
           let tlgMessageId = message.tlgMessageId ? message.tlgMessageId : "не определено" ;//":"1371",
           let tlgId = message.tlgId ? message.tlgId  : "не определено";//":"931824462",
           let form = message.form ? message.form  : "не определено" ;//":"order",           
           let typeOrder;//":"wake",
                switch(message.typeOrder) {
                    case "wake":
                        typeOrder = "похороны";
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
           let spzId = user.spzId ? user.spzId : "не определено";
           let name = user.name ? user.name : "не определено";
           let tlgName = user.tlgName ? user.tlgName : "не определено";
           let sponsor = user.tlgName ? user.tlgName : "не определено";

            return `Информация по заявке №${order}: \
            \n \n Сообщение в чате под номером ${tlgMessageId} \
             \n ID агента ${spzId} \
             \n Тип заявки ${typeOrder} \
             \n Горд ${city} \
             \n Время прощания  ${timeWake}\
             \n Контактное лицо (Лид) ${nameContact}\
             \n Номер телефона ${number}\
             \n ФОИ ${fio}\
             \n Дата смерти ${dateLeft}\
             \n Дата прощания ${dateWake}\            
             \n  Комментарии: ${comment}\
             \n \n Написать агенту @${tlgName}\
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
                        typeOrder = "похороны";
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
           let spzId = user.spzId ? user.spzId : "не определено";
           let name = user.name ? user.name : "не определено";
           let tlgName = user.tlgName ? user.tlgName : "не определено";
           let sponsor = user.tlgName ? user.tlgName : "не определено";

            return `Ваша заявка принята под №${order}: \            
             \n \n Тип заявки ${typeOrder} \
             \n Горд ${city} \
             \n Время прощания  ${timeWake}\
             \n Контактное лицо (Лид) ${nameContact}\
             \n Номер телефона ${number}\
             \n ФОИ ${fio}\
             \n Дата смерти ${dateLeft}\
             \n Дата прощания ${dateWake}\            
             \n  Комментарии: ${comment}\             
             \n Написать куратору @${sponsor}\
            `;
        },

            
            
        
  };

  
  module.exports = responseTemplate;
  