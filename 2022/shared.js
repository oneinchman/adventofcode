const fs = require("fs");

const readFile = async (path) =>
  new Promise((resolve) => {
    fs.readFile(path, "utf8", (_, data) => resolve(data));
  });

module.exports = {
  readFile,
};
