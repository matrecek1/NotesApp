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
const mongoose_1 = __importDefault(require("mongoose"));
const ejs_mate_1 = __importDefault(require("ejs-mate"));
const path_1 = __importDefault(require("path"));
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
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.use("/notes", notes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((err, req, res, next) => {
    res.status(500).render("error", { err });
});
app.listen(port, () => {
    console.log(`Listening on port ${port}, Url: http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map