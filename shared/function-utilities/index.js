"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMissingParameter = (context, parameter) => {
    context.res = {
        status: 400,
        body: `Missing required parameter "${parameter}"`,
    };
    return Promise.resolve();
};
exports.handleGenericError = (context, message = '') => {
    if (message) {
        context.log.error(message);
    }
    context.res = {
        status: 400,
        body: `Something went wrong. ${message}`.trim(),
    };
    return Promise.resolve();
};
//# sourceMappingURL=index.js.map