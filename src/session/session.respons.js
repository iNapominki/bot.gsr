const copirite_text = require("../utils/const/copirite_admin");
const option_data_dateLeft = require("../utils/option/option_data_dateLeft");
const option_data_dateWake = require("../utils/option/option_data_dateWake");
const option_order = require("../utils/option/option_order");
const options_role = require("../utils/option/options_role");
const regularRegex = require("../utils/regularRegex/regularRegex");

const SESSION_RESPONSE = {
  REG: {
    0: {
      title: "Введите ваше имя",
      validation: function (value) {
        if (value.length < 2) {
          return "Введено значение короче 2 букв";
        } else {
          return false;
        }
      },
    },
    1: {
      title: "Введите номер телефона в формате 89013337722, начиная с 8ки",
      validation: function (value) {
        console.log("validationMessage", value);
        if (!regularRegex.phone.test(value)) {
          return "Введено значение телефона не по формату, номер должен начинаться с 89 и содержать 11 цыфр";
        } else {
          return false;
        }
      },
    },
    2: {
      title: "Выберите роль",
      option: options_role,
      validation: function (value) {
        if (value) {
          return "Выберите один из вариантов по кнопке";
        } else {
          return false;
        }
      },
    },
    3: {
      title: "Все заполнено, данные отправлены на регистрацию",
    },
  },

  ORDER: {
    0: {
      title: "Контактное лицо",
      validation: function (value) {
        if (value.length < 2) {
          return "Введено значение короче 2 букв";
        } else {
          return false;
        }
      },
    },
    1: {
      title: "Телефон заказчика в формате 89013337722, начиная с 8ки",
      validation: function (value) {
        console.log("validationMessage", value);
        if (!regularRegex.phone.test(value)) {
          return "Введено значение телефона не по формату, номер должен начинаться с 89 и содержать 11 цыфр";
        } else {
          return false;
        }
      },
    },
    2: {
      title: "ФИО усопшего",
      validation: function (value) {
        if (value.length < 4) {
          return "Введено значение короче 4 букв";
        } else {
          return false;
        }
      },
    },
    3: {
      title: "Дата смерти в формате 21.12.2014",
      option: option_data_dateLeft,
      validation: function (value) {
        if (!regularRegex.date.test(value)) {
          return "Формат даты быбран неправильно";
        } else {
          return false;
        }
      },
    },
    4: {
      title: "Дата поминок в формате 21.12.2014",
      option: option_data_dateWake,
      validation: function (value) {
        if (!regularRegex.date.test(value)) {
          return "Формат даты быбран неправильно";
        } else {
          return false;
        }
      },
    },
    5: {
      title: "Время поминок",
      option: option_order.timeWake,
      validation: function (value) {
        if (value) {
          return "Выберите один из вариантов по кнопке, если не знаете то выберите первую кнопку";
        } else {
          return false;
        }
      },
    },
    6: {
      title: "Город",
      option: option_order.city,
      validation: function (value) {
        if (value) {
          return "Выберите один из вариантов по кнопке, если не знаете то выберите первую кнопку";
        } else {
          return false;
        }
      },
    },
    7: {
      title: "Мето прощания (Адрес в произвольной форме)",
      option: option_order.placeWake,
      validation: function (value) {
        return false;
      },
    },
    8: {
      title: "Комментарий",
      option: option_order.comment,
      validation: function (value) {
        return false;
      },
    },
    9: {
      title:
        `Заявка оформлена, дождитесь ответа, с информацией по заявке, если ответа нет обратитесь к администратору ${copirite_text.admin}`,
      validation: function (value) {
        return false;
      },
    },
  },

  CHAT_AGENT_MANAGER: {
    0: {
      title: "Ниже напишите сообщение менеждеру",
      validation: function (value) {        
          return false;        
      },
    },   
    1: {
      title: "Сообщение менеджеру отправлено",
      validation: function (value) {
        return false;
      },
    },
  },
};

module.exports = SESSION_RESPONSE;
