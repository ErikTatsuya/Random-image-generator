const fs = require("fs").promises;

async function listFiles(dirPath) {
  return await fs.readdir(dirPath);
}

module.exports = { listFiles };
