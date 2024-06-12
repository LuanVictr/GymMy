"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const port = process.env.PORT ?? 3001;
const sslServer = https_1.default.createServer({
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, 'cert', 'cert-key.pem')).toString(),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, 'cert', 'cert.pem')).toString(),
}, app_1.default);
sslServer.listen(port, () => console.log(`Server online on port ${port}`));
