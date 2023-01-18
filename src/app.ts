if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import ejsMate from 'ejs-mate';
import path from 'path';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import passport from "passport"
import LocalStrategy from "passport-local"
import { User } from './models/users';

import notesRoutes from './routes/notes'
import userRoutes from './routes/user'

const app = express();
const port = process.env.PORT || "3000";
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/notesapp";
const secret = process.env.SECRET || "thisisasecret";
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbUrl);
    console.log("Connected to db");
}
app.engine("ejs", ejsMate)
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", 'ejs')
app.use(session({
    secret: secret,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    saveUninitialized: true,
}))
app.use(flash())
app.use(express.urlencoded())
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, './public')))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.url = req.originalUrl;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/notes", notesRoutes)
app.use('/user', userRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).render("error", { err })
})


app.listen(port, () => {
    console.log(`Listening on port ${port}, Url: http://localhost:${port}`);
});