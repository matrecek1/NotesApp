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
const users_1 = require("../models/users");
const notes_1 = require("../models/notes");
const getSorters_1 = require("../utils/getSorters");
const notesForPage_1 = require("../utils/notesForPage");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pages = req.pages;
    const user = req.user;
    const { notes } = yield users_1.User.findById(user._id).select('notes').populate('notes');
    const extendedPages = (0, notesForPage_1.extendPageData)(pages, notes);
    const pagedNotes = (0, notesForPage_1.getNotesForPage)(extendedPages, notes);
    const sorters = (0, getSorters_1.getSorters)(notes);
    res.locals.pages = extendedPages;
    res.render("notes/index", { notes: pagedNotes, sorters });
});
exports.index = index;
const newNoteForm = (req, res) => {
    res.render('notes/new');
};
exports.newNoteForm = newNoteForm;
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = new notes_1.Note(req.body.note);
    const user = req.user;
    yield users_1.User.updateOne(user, { $push: { notes: newNote } });
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
    const { _id: userId } = req.user;
    const { id: noteId } = req.params;
    yield users_1.User.findByIdAndUpdate(userId, { $pull: { notes: noteId } });
    const note = yield notes_1.Note.findByIdAndDelete(noteId);
    res.redirect('/notes');
});
exports.deleteNote = deleteNote;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pages = req.pages;
    const { category } = req.params;
    const user = req.user;
    const { notes } = yield users_1.User.findById(user._id).select('notes').populate('notes');
    const notesByCat = (0, getSorters_1.getNotesByCategory)(notes, category);
    const extendedPages = (0, notesForPage_1.extendPageData)(pages, notesByCat);
    const pagedNotes = (0, notesForPage_1.getNotesForPage)(extendedPages, notesByCat);
    const sorters = (0, getSorters_1.getSorters)(notes);
    res.locals.pages = extendedPages;
    res.locals.activeCategory = category;
    res.render('notes/category', { sorters, notes: pagedNotes });
});
exports.getCategories = getCategories;
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { tag } = req.params
    // const notes = await Note.find()
    // const sorters = getSorters(notes)
    // const notesByTag = getNotesByTags(notes, tag)
    // const pages: Pages = {
    //     currentPage: req.pages!.currentPage,
    //     notesPerPage: req.pages!.notesPerPage,
    //     //numOfPages: notesByTag.length
    // }
    // res.locals.activeTag = tag
    // res.locals.pages = pages
    // res.render('notes/tags', { sorters, notes: notesByTag })
    const pages = req.pages;
    const { tag } = req.params;
    const user = req.user;
    const { notes } = yield users_1.User.findById(user._id).select('notes').populate('notes');
    const notesByTag = (0, getSorters_1.getNotesByTags)(notes, tag);
    const extendedPages = (0, notesForPage_1.extendPageData)(pages, notesByTag);
    const pagedNotes = (0, notesForPage_1.getNotesForPage)(extendedPages, notesByTag);
    const sorters = (0, getSorters_1.getSorters)(notes);
    res.locals.pages = extendedPages;
    res.locals.activeTag = tag;
    res.render('notes/tags', { sorters, notes: pagedNotes });
});
exports.getTags = getTags;
//# sourceMappingURL=notes.js.map