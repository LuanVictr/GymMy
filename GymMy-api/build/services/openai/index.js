"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apikey = process.env.OPENAI_KEY;
const openai = new openai_1.default({ apiKey: apikey });
async function GenerateAnswer(question, prevMessages) {
    const payload = {
        messages: [
            {
                role: "system",
                content: "You are a exercise assistant ready to ask questions about gym, exercises and fitness lifestyle. Answer like a professional and be brief. Use the most updated information and always explain how to do the exercises, treat people like they are a beginer. Use neutral languagde. give brief answers and talk in portuguese, format the answer in html",
            },
        ],
        model: "gpt-3.5-turbo",
    };
    if (question) {
        payload.messages.push({ role: "user", content: question });
    }
    const completion = await openai.chat.completions.create(payload);
    return completion.choices[0].message.content;
}
exports.default = GenerateAnswer;
