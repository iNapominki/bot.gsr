const option_order = {
    city: {
        reply_markup: {
          inline_keyboard: [          
            [
            { text: "Москва", callback_data: "button_order_moscow" }, 
            { text: "МО", callback_data: "button_order_mo" },
            { text: "СПб", callback_data: "button_order_cpb" }, 
            { text: "ЛО", callback_data: "button_order_lo" },
            { text: "НН", callback_data: "button_order_nn" }
            ],
          ],
        },
      },

      timeWake: {
        reply_markup: {
            inline_keyboard: [          
                [
                    {
                      text: "9:00-9:30",
                       callback_data: "9:00-9:30",
                    },
                    {
                      text: "9:30-10:00",
                       callback_data: "9:30-10:00",
                    },
                    {
                      text: "10:00-10:30",
                       callback_data: "10:00-10:30",
                    },
                    {
                      text: "10:30-11:00",
                       callback_data: "10:30-10:00",
                    },
                ],[
                    {
                      text: "11:00-11:30",
                       callback_data: "11:00-11:30",
                    },
                    {
                      text: "11:30-12:00",
                       callback_data: "11:30-12:00",
                    },
                    {
                      text: "12:00-12:30",
                       callback_data: "12:00-12:30",
                    },
                    {
                      text: "12:30-13:00",
                       callback_data: "12:30-13:00",
                    },
                ],[
                    {
                      text: "13:00-13:30",
                       callback_data: "13:00-13:30",
                    },
                    {
                      text: "13:30-14:00",
                        callback_data: "13:30-14:00",
                    },
                    {
                      text: "14:00-14:30",
                        callback_data: "14:00-14:30",
                    },
                    {
                      text: "14:30-15:00",
                        callback_data: "14:30-15:00",
                    },
                ],[
                    {
                      text: "15:00-15:30",
                        callback_data: "15:00-15:30",
                    },
                    {
                      text: "15:30-16:00",
                        callback_data: "15:30-16:00",
                    },
                    {
                      text: "16:00-16:30",
                        callback_data: "16:00-16:30",
                    },
                    {
                      text: "16:30-17:00",
                        callback_data: "16:30-17:00",
                    },
                ],[
                    {
                      text: "17:00-17:30",
                        callback_data: "17:00-17:30",
                    },
                    {
                      text: "17:30-18:00",
                        callback_data: "17:30-18:00",
                    },
                
                    {
                      text: "18:00-18:30",
                        callback_data: "18:00-18:30",
                    },
                    {
                      text: "18:30-19:00",
                        callback_data: "18:30-19:00",
                    },
                ],[
                    {
                      text: "19:00-19:30",
                        callback_data: "19:00-19:30",
                    },
                    {
                      text: "19:30-20:00",
                        callback_data: "19:30-20:00",
                    },
                
                    {
                      text: "20:00-20:30",
                        callback_data: "20:00-20:30",
                    },
                    {
                      text: "20:30-21:00",
                        callback_data: "20:30-21:00",
                    },
                ],[
                    {
                      text: "21:00-21:30",
                        callback_data: "21:00-21:30",
                    },
                    {
                      text: "21:30-22:00",
                        callback_data: "21:30-22:00",
                    },
                  ]
            ],
          },

      }

}

module.exports = option_order;


// case "9:00-9:30": "9:00-9:30",
// case "9:30-10:00": "9:30-10:00",      
// case"10:00-10:30": "10:00-10:30",       
// case "10:30-11:00": "10:30-10:00",
// case "11:00-11:30": "11:00-11:30",        
// case "11:30-12:00": "11:30-12:00",       
// case "12:00-12:30": "12:00-12:30",       
// case "12:30-13:00": "12:30-13:00",      
// case"13:00-13:30": "13:00-13:30",
// case "13:30-14:00": "13:30-14:00",
// case "14:00-14:30": "14:00-14:30",
// case"14:30-15:00": "14:30-15:00",
// case "15:00-15:30": "15:00-15:30",
// case "15:30-16:00": "15:30-16:00",
// case "16:00-16:30": "16:00-16:30",
// case"16:30-17:00": "16:30-17:00",
// case"17:00-17:30": "17:00-17:30",
// case"17:30-18:00": "17:30-18:00",
// case"18:00-18:30": "18:00-18:30",
// case "18:30-19:00": "18:30-19:00",
// case"19:00-19:30": "19:00-19:30",
// case "19:30-20:00": "19:30-20:00",
// case "20:00-20:30": "20:00-20:30",
// case "20:30-21:00": "20:30-21:00",
// case"21:00-21:30": "21:00-21:30",
// case "21:30-22:00": "21:30-22:00",