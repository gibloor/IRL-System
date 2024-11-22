import express from 'express';
import { signUp, signIn, tokenVerify } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/token-verify', authenticateToken, tokenVerify);

export default router;