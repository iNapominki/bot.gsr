const query_btn = require("../const/query_btn");

function optionBtnApprove({ message_id, order_number }) {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Согласовано",
            callback_data: `option_btn_approve?${query_btn.approve}=true,${query_btn.message_id}=${message_id},${query_btn.order_number}=${order_number} `,
          },
          {
            text: "Не согласовано",
            callback_data: `option_btn_approve?${query_btn.approve}=false,${query_btn.message_id}=${message_id},${query_btn.order_number}=${order_number} `,
          },
        ],
      ],
    },
  };
}

module.exports = optionBtnApprove;

