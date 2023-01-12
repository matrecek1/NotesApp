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
const notes_1 = require("../models/notes");
const indexHelper_1 = require("./indexHelper");
const app = (0, express_1.default)();
mongoose_1.default.connect('mongodb://127.0.0.1:27017/notesapp');
console.log("Connected to db");
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log("connected to database"));
const seedNotes = () => __awaiter(void 0, void 0, void 0, function* () {
    yield notes_1.Note.deleteMany();
    for (let i = 0; i < 10; i++) {
        let random357 = Math.floor(Math.random() * 357);
        let note = new notes_1.Note({
            title: indexHelper_1.titles[random357],
            noteBody: 'Exercitation veniam tempor ut dolor. Labore cupidatat dolor velit aliquip ut elit reprehenderit ullamco. Sit Lorem proident exercitation sint eu ullamco est ad sunt. Nisi consectetur tempor amet culpa qui eiusmod consequat est quis. Anim sit officia adipisicing occaecat ut eiusmod magna. Do ea aliquip non magna deserunt ea mollit elit laboris nostrud. Cillum ullamco minim eu id Lorem enim cupidatat esse cupidatat.'
        });
        yield note.save();
    }
});
const runIt = () => __awaiter(void 0, void 0, void 0, function* () {
    yield seedNotes();
    db.close();
});
runIt();
//# sourceMappingURL=index.js.map