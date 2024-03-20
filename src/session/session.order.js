//const fs = require('fs');
const Session = require('./session');


class SessionOrder extends Session {
  constructor(msg, bot) {
    super(bot);
    this.FileName = "order.json";
    this.message = [];
    this.file = this.getfileJsonFormessage(this.FileName);
    this.step = 0;
    this.msg = msg;
  }

  

//   logMessage(type = "error", message = "короткое название события", stack = "отсутствует" ) {
//     if (!fs.existsSync(this.logFileName)) {
//       fs.writeFileSync(this.logFileName, '[]', 'utf8');
//     }

//     const fileContent = fs.readFileSync(this.logFileName, 'utf8');
//     this.log = JSON.parse(fileContent);
   

//     this.log.push({
//       timestamp: new Date().toISOString(),
//       type: type,
//       message: message,
//       stack: JSON.stringify(stack, null, 2)
//     });

//     fs.writeFileSync(this.logFileName, JSON.stringify(this.log, null, 2), 'utf8');
//   }
}

module.exports = SessionOrder;