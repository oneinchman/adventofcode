const fs = require("fs");

const readFile = async (path) =>
  new Promise((resolve) => {
    fs.readFile(path, "utf8", (_, data) => resolve(data));
  });

const getMedian = (values) => {
  values.sort((a, b) => a - b);
  const half = Math.floor(values.length / 2);
  if (values.length % 2) return values[half];
  return (values[half - 1] + values[half]) / 2;
};

const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    const key = args;
    if (key in cache) {
      //console.log("cache");
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};

module.exports = {
  readFile,
  getMedian,
  memoize,
};
