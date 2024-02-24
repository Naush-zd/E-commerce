import { Router } from "express";

import { registeruser, login } from "../controller/user.controller.js";

const router = Router()

// routes 
router.route("/register").post(registeruser)
router.route("/login").post(login)

export default router