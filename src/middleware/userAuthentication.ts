import { RequestHandler } from "express";

export const isLoggedIn: RequestHandler = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash("error", "You must be logged in!")
        return res.redirect('/user/login')
    }
    next()
}