import { Router } from "express";
import userValidation from '../validations/sign'
import registerUser from "../controller/sign";
import login from "../controller/login";
import answerQuestion from "../controller/openai";


const router = Router();

router.use((req, res, next) => {
    next();
  });

router.get('/', () => console.log('hello world'));
router.post('/sign', userValidation.sign, registerUser);
router.post('/login', login);
router.post('/question', answerQuestion);

export default router;