import { Router } from "express";
const router = Router()
import { catchAsync } from "../utils/catchAync";
import { loginForm, loginUser, logoutUser, newUser, registerForm } from "../controllers/users";
import passport = require("passport");

router.get('/register', registerForm)
router.post('/register', catchAsync(newUser))
router.get('/login', loginForm)
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/user/login" }), catchAsync(loginUser));
router.get('/logout', logoutUser)

export default router