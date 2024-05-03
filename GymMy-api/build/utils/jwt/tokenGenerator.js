"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET ?? '3Gk7sR2P8eF';
function generateToken(payload) {
    return jsonwebtoken_1.default.sign({ name: payload.name }, secret, { expiresIn: '3d' });
}
exports.generateToken = generateToken;
function validateToken(token) {
    return jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            return false;
        }
        return true;
    });
}
exports.validateToken = validateToken;
