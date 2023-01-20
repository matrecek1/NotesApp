import { RequestHandler, Request, Response, NextFunction } from "express";
import { User } from "../models/users";

export const registerForm: RequestHandler = async (req, res) => {
    res.render('users/register')
}

export const newUser:RequestHandler = async(req, res, next) =>{
    const { username, password } = req.body;
    const user = new User({ username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Yelp Camp!");
        res.redirect("/notes");
})
}

export const loginForm: RequestHandler = async (req, res) => {
    res.render('users/login')
}

export const loginUser: RequestHandler = async (req, res) => {
        req.flash("success", "welcome back!");
        res.redirect("/notes");
}

export const logoutUser:RequestHandler = async (req, res,next)=>{
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/user/login");
    });
}