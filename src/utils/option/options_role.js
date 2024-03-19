const options_role = {
    reply_markup: {
      inline_keyboard: [          
        [{ text: "Работник СПЗ", callback_data: "button_emploee" }, 
        { text: "Агент", callback_data: "button_agent" }],
      ],
    },
  };

  module.exports = options_role;