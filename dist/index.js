"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handler(opts) {
    var defaults = {
        logger: console.error,
    };
    var options = Object.assign({}, defaults, opts);
    return {
        onError: function (handler, next) {
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
exports.default = handler;
//# sourceMappingURL=index.js.map