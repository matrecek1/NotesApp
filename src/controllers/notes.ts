import { RequestHandler } from "express";
import { Note } from '../models/notes'
import { getSorters, getNotesByTags, getNotesByCategory } from "../utils/getSorters";
interface Pages{
    currentPage: number;
    numOfPages: number;
}



export const index: RequestHandler = async (req, res) => {
    const notesPerPage = 18
    const {p} = req.query
    let page: number
    if (typeof p === 'string') page = parseInt(p)
    else page = 0
    const noteCount = await Note.estimatedDocumentCount()
    const pageCount = Math.ceil(noteCount / notesPerPage)
    const pages: Pages = {
        currentPage: page,
        numOfPages: pageCount,
    }
    const notes = await Note.find().skip(page * notesPerPage).limit(notesPerPage)
    const sorters = getSorters(notes)
    res.render("notes/index", { notes, sorters, pages})
}  

export const newNoteForm: RequestHandler = (req, res) => {
    res.render('notes/new')
}

export const createNote: RequestHandler = async (req, res, next) => {
    console.log(req.body.note);
    const newNote = new Note(req.body.note);
    console.log(newNote);
    await newNote.save();
    req.flash("success", "note created")
    res.redirect('/notes')
}

export const showNote: RequestHandler<{ id: string }> = async (req, res, next) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/show', { note })
}

export const editNoteForm: RequestHandler<{ id: string }> = async (req, res, next) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit', { note })
}

export const updateNote: RequestHandler<{ id: string }> = async (req, res, next) => {
    const { id } = req.params
    console.log(req.body);
    const note = await Note.findByIdAndUpdate(id, { ...req.body.note })
    if (note) {
        console.log(note);
        note.save()
        res.redirect('/notes/' + id)
    }
    throw new Error('note didnt update')
}

export const deleteNote: RequestHandler<{ id: string }> = async (req, res, next) => {
    const { id } = req.params
    const note = await Note.findByIdAndDelete(id)
    res.redirect('/notes')
}

export const getCategories: RequestHandler<{ category: string }> = async (req, res, next) => {
    const { category } = req.params
    const notes = await Note.find()
    const sorters = getSorters(notes)
    const notesByCat = getNotesByCategory(notes, category)
    res.render('notes/categories', { sorters, notes: notesByCat })
}

export const getTags: RequestHandler<{ tag: string }> = async (req, res, next) => {
    const { tag } = req.params
    const notes = await Note.find()
    const sorters = getSorters(notes)
    const notesByTag = getNotesByTags(notes, tag)
    res.render('notes/tags', { sorters, notes: notesByTag })
}