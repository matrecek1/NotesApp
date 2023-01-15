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
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const ejs_mate_1 = __importDefault(require("ejs-mate"));
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const notes_1 = __importDefault(require("./routes/notes"));
const app = (0, express_1.default)();
const port = '3000';
main().catch(err => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb://127.0.0.1:27017/notesapp');
        console.log("Connected to db");
    });
}
app.engine("ejs", ejs_mate_1.default);
app.set("views", path_1.default.join(__dirname, 'views'));
app.set("view engine", 'ejs');
app.use((0, express_session_1.default)({
    secret: 'secret',
    cookie: {
        maxAge: 30000,
        secure: false
    },
    saveUninitialized: true,
}));
app.use((0, connect_flash_1.default)());
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.use((0, method_override_1.default)('_method'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
app.use("/notes", notes_1.default);
app.use((err, req, res, next) => {
    res.status(500).render("error", { err });
});
app.listen(port, () => {
    console.log(`Listening on port ${port}, Url: http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map