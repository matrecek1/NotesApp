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
exports.getTags = exports.getCategories = exports.deleteNote = exports.updateNote = exports.editNoteForm = exports.showNote = exports.createNote = exports.newNoteForm = exports.index = void 0;
const notes_1 = require("../models/notes");
const getSorters_1 = require("../utils/getSorters");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.pages)
        throw new Error("pages undefined");
    const pages = req.pages;
    res.locals.pages = req.pages;
    const skip = pages.currentPage * pages.notesPerPage;
    const notes = yield notes_1.Note.find().skip(skip).limit(pages.notesPerPage);
    const sorters = (0, getSorters_1.getSorters)(notes);
    res.render("notes/index", { notes, sorters });
});
exports.index = index;
const newNoteForm = (req, res) => {
    res.render('notes/new');
};
exports.newNoteForm = newNoteForm;
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = new notes_1.Note(req.body.note);
    console.log(newNote);
    yield newNote.save();
    req.flash("success", "note created");
    res.redirect('/notes');
});
exports.createNote = createNote;
const showNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield notes_1.Note.findById(req.params.id);
    res.render('notes/show', { note });
});
exports.showNote = showNote;
const editNoteForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield notes_1.Note.findById(req.params.id);
    res.render('notes/edit', { note });
});
exports.editNoteForm = editNoteForm;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(req.body);
    const note = yield notes_1.Note.findByIdAndUpdate(id, Object.assign({}, req.body.note));
    if (note) {
        console.log(note);
        note.save();
        res.redirect('/notes/' + id);
    }
    throw new Error('note didnt update');
});
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const note = yield notes_1.Note.findByIdAndDelete(id);
    res.redirect('/notes');
});
exports.deleteNote = deleteNote;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    res.locals.pages = req.pages;
    res.locals.activeCategory = category;
    const notes = yield notes_1.Note.find();
    const sorters = (0, getSorters_1.getSorters)(notes);
    const notesByCat = (0, getSorters_1.getNotesByCategory)(notes, category);
    res.render('notes/index', { sorters, notes: notesByCat });
});
exports.getCategories = getCategories;
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tag } = req.params;
    res.locals.pages = req.pages;
    res.locals.activeTag = tag;
    const notes = yield notes_1.Note.find();
    const sorters = (0, getSorters_1.getSorters)(notes);
    const notesByTag = (0, getSorters_1.getNotesByTags)(notes, tag);
    res.render('notes/index', { sorters, notes: notesByTag });
});
exports.getTags = getTags;
//# sourceMappingURL=notes.js.map