"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const signSchema = {
    name: celebrate_1.Joi.string().required(),
    password: celebrate_1.Joi.string().required(),
};
const sign = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object({
        ...signSchema
    }),
}, {
    abortEarly: true,
});
exports.default = { sign };
