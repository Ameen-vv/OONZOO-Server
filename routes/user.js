import express from "express";
import { signIn, userRegister } from "../controllers/userController.js";
const router = express.Router();

router.post("/register", userRegister);
router.post("/signIn", signIn);

export default router;
