"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("../../services/openai"));
const answerQuestion = async (req, res) => {
    const { question } = req.body;
    const completion = await (0, openai_1.default)(question);
    console.log(completion);
    res.status(200).json({ answer: completion });
};
exports.default = answerQuestion;
