"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in!");
        return res.redirect('/user/login');
    }
    next();
};
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=userAuthentication.js.map