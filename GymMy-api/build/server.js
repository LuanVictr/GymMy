"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app_1.default.listen(port, function () { return console.log("Server online on port ".concat(port)); });
