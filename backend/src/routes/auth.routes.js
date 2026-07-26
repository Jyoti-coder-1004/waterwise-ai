import express from 'express';
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, verifyEmail, refreshToken } from '../controllers/auth.controller.js';
import { validateRegister, validateLogin } from '../validators/auth.validator.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', authLimiter, validateLogin, loginUser);
router.post('/logout', protect, logoutUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/verifyemail/:token', verifyEmail);
router.post('/refresh', refreshToken);

export default router;
