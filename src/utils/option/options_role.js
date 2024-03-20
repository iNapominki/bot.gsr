const options_role = {
    reply_markup: {
      inline_keyboard: [          
        [{ text: "Сотрудник СПЗ", callback_data: "button_employee" }, 
        { text: "Агент", callback_data: "button_agent" }],
      ],
    },
  };

  module.exports = options_role;