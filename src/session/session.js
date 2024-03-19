const fs = require("fs");

class Session {
  constructor() {    
  }

  getfileJsonFormessage(fileName) {
    if (!fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, '[]', "utf8");
    //  fs.writeFileSync(fileName, JSON.stringify([{ tlgId: 999999999}], null, 2), "utf8");
    }

    const fileContent = fs.readFileSync(fileName, "utf8");
    const session = JSON.parse(fileContent);
    return session;
  }

  writeTofilesession(fileName, session) {
    fs.writeFileSync(fileName, JSON.stringify(session, null, 2), "utf8");
  }
}

module.exports = Session;
