
function handler (opts : any) : any {
  const defaults = {
    logger: console.error,
  };
  const options = Object.assign({}, defaults, opts);
  return {
    onError: (handler : any, next:any) : any => {
      if (typeof options.logger === "function") {
        options.logger(handler.error);
      }
      if (handler.error.statusCode && handler.error.message) {
        handler.response = {
          statusCode: handler.error.statusCode,
          body: JSON.stringify({
            statusCode: handler.error.statusCode,
            error: handler.error.message,
          }),
        };
        return next();
      }
      return next(handler.error);
    },
  };
}

export default handler;
