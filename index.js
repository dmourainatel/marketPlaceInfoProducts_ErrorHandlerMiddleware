"use strict";
module.exports = (opts) => {
  const defaults = {
    logger: console.error,
  };
  const options = Object.assign({}, defaults, opts);
  return {
    onError: (handler, next) => {
      if (typeof options.logger === "function") {
        options.logger(handler.error);
      }
      if (handler.error.statusCode && handler.error.message) {
        handler.response = {
          statusCode: handler.error.statusCode,
          body: JSON.stringify({
            error: handler.error,
          }),
        };
        return next();
      }
      return next(handler.error);
    },
  };
};
