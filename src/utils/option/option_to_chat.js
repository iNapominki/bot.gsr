function optionToChat(data) {
   
    return {
      reply_markup: {
        inline_keyboard: [[{ text: data, callback_data: data }]],
      },
    };
  }
  
  module.exports = optionToChat;