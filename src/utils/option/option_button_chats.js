// function optionButtonChats(data) {  

//   const button = data.map((i) => {
//     return { text: i.order_number, callback_data: i.order_number };
//   });

//   console.log(button);

//   return {
//     reply_markup: {
//       inline_keyboard: [button],
//     },
//   };
// }

// module.exports = optionButtonChats;

function optionButtonChats(data) {

  console.log(data)
  const buttons = [];
  const chunkSize = 4;

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    const formattedChunk = chunk.map((item) => {
      return { text: item.order_number, callback_data: item.order_number };
    });
    buttons.push(formattedChunk);
  }  

  return {
    reply_markup: {
      inline_keyboard: buttons,
    },
  };
}

module.exports = optionButtonChats;
