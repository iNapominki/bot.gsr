const options_btn = {
    reply_markup: {
      inline_keyboard: [          
        [{ text: "Запросить статус", callback_data: "button_status" }],
      ],
    },
  };

  module.exports = options_btn;


  // const input_btn = {
  //   reply_markup: {
  //     keyboard: [
  //       [{ text: "Введите данные", request_contact: false, request_location: false }],
  //     ],
  //     resize_keyboard: true,
  //     one_time_keyboard: true,
  //   },
  // };
  
  // module.exports = input_btn;