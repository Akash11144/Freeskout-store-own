const logger = {
  info: (key = null, obj) => {
    if (key && key.length) {
      // console.log(key, JSON.stringify(obj, null, 2));
    } else {
      // console.log(JSON.stringify(obj, null, 2));
    }
  },
  error: (key = null, obj) => {
    if (key && key.length) {
      // console.log(key, JSON.stringify(obj, null, 2));
    } else {
      // console.log(JSON.stringify(obj, null, 2));
    }
  },
};

module.exports = {
  logger,
};
