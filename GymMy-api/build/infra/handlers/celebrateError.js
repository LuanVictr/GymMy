"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
function celebrateError(err, req, res, next) {
    if (err instanceof celebrate_1.CelebrateError) {
        res.status(422).json({ message: err.details.get('body')?.message });
    }
    next(err);
}
exports.default = celebrateError;
