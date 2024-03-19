const options_role = require("../utils/option/options_role");

const SESSION_RESPONSE = {
    REG: {
    0: {
      title: "Введите ваше имя, не менее 4 букв",
    },
    1: {
      title: "Введите номер телефона в формате 89013337722, начиная с 8ки",
    },
    2: {
      title: "Выберите роль",
      option: options_role
    },
    3: {
      title: "Все заполнено, данные отправлены на регистрацию",
    },
    4: {
      title: "",
    },
    5: {
      title: "",
    },
    404 : {
        title: "Произошла ошибка обратитесь к администратору",
    }
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
