function optionButtonChats(data) {  

  const button = data.map((i) => {
    return { text: i.order_number, callback_data: i.order_number };
  });

  return {
    reply_markup: {
      inline_keyboard: [button],
    },
  };
}

module.exports = optionButtonChats;
