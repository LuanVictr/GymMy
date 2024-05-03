"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sign_1 = __importDefault(require("../validations/sign"));
const sign_2 = __importDefault(require("../controller/sign"));
const login_1 = __importDefault(require("../controller/login"));
const openai_1 = __importDefault(require("../controller/openai"));
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    next();
});
router.get('/', () => console.log('hello world'));
router.post('/sign', sign_1.default.sign, sign_2.default);
router.post('/login', login_1.default);
router.post('/question', openai_1.default);
exports.default = router;
