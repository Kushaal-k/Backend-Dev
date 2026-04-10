import { Router } from "express"
import { register, verifyEmail, login, forgotPassword, resetPassword } from "../controllers/user.controller.js";

const router = Router();

router.post('/register', register)
router.get('/verify', verifyEmail)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)


export default router;