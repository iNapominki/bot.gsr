const fs = require('fs');

class ErrorManager {
  constructor() {
    this.errors = [];
  }

  logError(error) {
    this.errors.push({
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack
    });

    fs.writeFileSync('errors.json', JSON.stringify(this.errors, null, 2));
  }
}

module.exports = ErrorManager;