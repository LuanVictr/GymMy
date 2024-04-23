import { Router } from "express";
import userValidation from '../validations/sign'
import registerUser from "../controller/sign";


const router = Router();

router.use((req, res, next) => {
    next();
  });

router.get('/', () => console.log('hello world'));
router.post('/sign', userValidation.sign, registerUser);

export default router;