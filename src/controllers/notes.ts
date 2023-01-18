import { RequestHandler, Request, Response, NextFunction } from "express";
import { request } from "http";
import { Note } from '../models/notes'
import { getSorters, getNotesByTags, getNotesByCategory, Sorter } from "../utils/getSorters";





export const index = async (req:Request, res:Response) => {
    const pages = req.pages!
    const noteCount = await Note.estimatedDocumentCount()
    const pageCount = Math.ceil(noteCount / pages.notesPerPage)
    pages.numOfPages = pageCount
    res.locals.pages = req.pages
    const skip = pages.currentPage * pages.notesPerPage
    const notes = await Note.find().skip(skip).limit(pages.notesPerPage)
    const sorters:Sorter = getSorters(notes)
    res.render("notes/index", { notes, sorters})
}  

export const newNoteForm: RequestHandler = (req, res) => {
    res.render('notes/new')
}

export const createNote: RequestHandler = async (req, res, next) => {
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

export const getCategories = async (req: Request, res:Response) => {
    const { category } = req.params
    res.locals.pages = req.pages
    res.locals.activeCategory = category
    const notes = await Note.find()
    const sorters = getSorters(notes)
    const notesByCat = getNotesByCategory(notes, category)
    res.render('notes/index', { sorters, notes: notesByCat })
}

export const getTags = async (req:Request, res:Response) => {
    const { tag } = req.params
    res.locals.pages = req.pages
    res.locals.activeTag = tag
    const notes = await Note.find()
    const sorters = getSorters(notes)
    const notesByTag = getNotesByTags(notes, tag)
    res.render('notes/index', { sorters, notes: notesByTag })
}