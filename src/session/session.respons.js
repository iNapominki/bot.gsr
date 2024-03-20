const options_role = require("../utils/option/options_role");
const regularRegex = require("../utils/regularRegex/regularRegex");
//let phoneNumberRegex = /^89\d{9}$/;

const SESSION_RESPONSE = {
    REG: {
    0: {
      title: "Введите ваше имя, не менее 4 букв",
      validation: function(value) {
        if(value.length < 4) {
          return "Введено значение короче 4 букв";
        } else {
          return false;
        }
      }
    },
    1: {
      title: "Введите номер телефона в формате 89013337722, начиная с 8ки",
      validation: function(value) {

        console.log("validationMessage", value);
        if(!regularRegex.phone.test(value)) {

          

          return "Введено значение телефона не по формату, номер должен начинаться с 89 и содержать 11 цыфр";
        } else {

          
          return false;
        }

      }
    },
    2: {
      title: "Выберите роль",
      option: options_role
    },
    3: {
      title: "Все заполнено, данные отправлены на регистрацию",
    },   
  },

  ORDER: {
    0: {
      title: "Введите данные",
    },
    1: {
      title: "",
    },
    2: {
      title: "",
    },
    3: {
      title: "",
    },
  },
};

module.exports = SESSION_RESPONSE;
