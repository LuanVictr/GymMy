import { Router } from "express";
import userValidation from '../validations/sign'
import conversation from '../validations/conversation'
import registerUser from "../controller/sign";
import login from "../controller/login";
import answerQuestion from "../controller/openai";
import { registerConversation } from "../controller/registers";
import { AuthUser } from "../middlewares/authMiddleware";
import { deleteConversationById, getAllConversationsByUserId } from "../controller/conversations";
import { getMessagesFromConversationId } from "../controller/messages";


const router = Router();

router.use((req, res, next) => {
    next();
  });

router.get('/', () => console.log('hello world'));
router.get('/test', (req, res) => res.json({message: 'healthy'}));
router.post('/sign', userValidation.sign, registerUser);
router.post('/login', login);
router.post('/question', answerQuestion);
router.post('/register', AuthUser, conversation.create, registerConversation);
router.get('/conversation/:id', AuthUser, getAllConversationsByUserId);
router.get('/conversation/:id/messages', AuthUser, getMessagesFromConversationId);
router.delete('/conversation/:id', AuthUser, deleteConversationById);

export default router;