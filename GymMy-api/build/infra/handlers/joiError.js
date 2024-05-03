"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function joiError(err, req, res, next) {
    if (err.joi && err.joi.name === 'ValidationError') {
        const details = [];
        err.status = 422;
        err.message = 'Validation Error';
        for (const detail of err.joi.details) {
            const { message, path } = detail;
            let key = '';
            for (const item of path) {
                key += !Number.isInteger(item) ? `.${item}` : `[${item}]`;
            }
            key = key.substr(1);
            details.push({ key, message });
        }
        err.details = details;
    }
    next(err);
}
exports.default = joiError;
