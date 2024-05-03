"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../../services/login"));
const login = async (req, res) => {
    const userInfo = req.body;
    const token = await (0, login_1.default)(userInfo);
    if (!token) {
        return res.status(404).json({ error: 'User does not exist.' });
    }
    return res.status(200).json({ token: token });
};
exports.default = login;
