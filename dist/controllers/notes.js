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
exports.deleteNote = exports.updateNote = exports.showNote = exports.createNote = exports.newNoteForm = exports.index = void 0;
const notes_1 = require("../models/notes");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notes_1.Note.find();
    res.render("notes/index", { notes });
});
exports.index = index;
const newNoteForm = (req, res) => {
    res.render('notes/new');
};
exports.newNoteForm = newNoteForm;
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.note);
    const newNote = new notes_1.Note(req.body.note);
    yield newNote.save();
    res.redirect('/notes');
});
exports.createNote = createNote;
const showNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield notes_1.Note.findById(req.params.id);
    res.render('notes/show', { note });
});
exports.showNote = showNote;
const updateNote = (req, res, next) => {
};
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => {
};
exports.deleteNote = deleteNote;
//# sourceMappingURL=notes.js.map