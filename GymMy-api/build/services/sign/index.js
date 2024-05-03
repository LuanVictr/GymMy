"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../database/models/user"));
async function registerUserService(newUserInfo) {
    try {
        const newUser = await user_1.default.create(newUserInfo);
        return newUser;
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = registerUserService;
