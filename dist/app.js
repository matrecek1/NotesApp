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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const ejs_mate_1 = __importDefault(require("ejs-mate"));
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const users_1 = require("./models/users");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const notes_1 = __importDefault(require("./routes/notes"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const port = process.env.PORT || "8080";
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/notesapp";
const secret = process.env.SECRET || "thisisasecret";
main().catch(err => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(dbUrl);
        console.log(`connected to db: ${dbUrl}`);
    });
}
app.engine("ejs", ejs_mate_1.default);
app.set("views", path_1.default.join(__dirname, 'views'));
app.set("view engine", 'ejs');
app.use((0, express_session_1.default)({
    store: connect_mongo_1.default.create({
        mongoUrl: dbUrl,
        touchAfter: 24 * 3600,
        secret
    }),
    name: "session",
    secret: secret,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    saveUninitialized: true,
}));
app.use((0, connect_flash_1.default)());
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.use((0, method_override_1.default)('_method'));
app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new passport_local_1.default(users_1.User.authenticate()));
passport_1.default.serializeUser(users_1.User.serializeUser());
passport_1.default.deserializeUser(users_1.User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.url = req.originalUrl;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
app.use("/notes", notes_1.default);
app.use('/user', user_1.default);
app.use((err, req, res, next) => {
    res.status(500).render("error", { err });
});
app.listen(port, () => {
    console.log(`Listening on port ${port}, Url: http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map