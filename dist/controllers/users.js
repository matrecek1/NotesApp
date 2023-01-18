"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.loginForm = exports.newUser = exports.registerForm = void 0;
const users_1 = require("../models/users");
const registerForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('users/register');
});
exports.registerForm = registerForm;
const newUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = new users_1.User({ username });
    const registeredUser = yield users_1.User.register(user, password);
    req.login(registeredUser, (err) => {
        if (err)
            return next(err);
        req.flash("success", "Welcome to Yelp Camp!");
        res.redirect("/notes");
    });
});
exports.newUser = newUser;
const loginForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('users/login');
});
exports.loginForm = loginForm;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.flash("success", "welcome back!");
    res.redirect("/notes");
});
exports.loginUser = loginUser;
//# sourceMappingURL=users.js.map