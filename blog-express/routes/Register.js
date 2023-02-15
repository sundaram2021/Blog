import express from "express";
import { registerController, loginController } from '../controllers/RegisterController.js'

const router = express();

router.post("/register", registerController)
router.post("/login", loginController)

export default router;