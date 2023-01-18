"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const catchAync_1 = require("../utils/catchAync");
const users_1 = require("../controllers/users");
const passport = require("passport");
router.get('/register', users_1.registerForm);
router.post('/register', (0, catchAync_1.catchAsync)(users_1.newUser));
router.get('/login', users_1.loginForm);
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/user/login" }), (0, catchAync_1.catchAsync)(users_1.loginUser));
exports.default = router;
//# sourceMappingURL=user.js.map