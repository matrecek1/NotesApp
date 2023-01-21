import { RequestHandler, Request, Response, NextFunction } from "express";
import { Pages } from "../middleware/notes/pages";
import { User} from "../models/users";
import { INote, Note } from '../models/notes'
import { getSorters, getNotesByTags, getNotesByCategory, Sorter } from "../utils/getSorters";
import { ObjectId } from "mongoose";
import { extendPageData, getNotesForPage } from "../utils/notesForPage";
interface IUser{
    _id: ObjectId;
    notes:INote[];
    username: string;
}




export const index = async (req:Request, res:Response) => {
    const pages = req.pages!
    const user = req.user as IUser
    const {notes} = await User.findById(user._id).select('notes').populate('notes')
    const extendedPages = extendPageData(pages, notes)
    const pagedNotes:INote[] = getNotesForPage(extendedPages, notes)
    const sorters:Sorter = getSorters(notes)
    res.locals.pages = extendedPages
    res.render("notes/index", { notes:pagedNotes, sorters})
}  

export const newNoteForm: RequestHandler = (req, res) => {
    res.render('notes/new')
}

export const createNote: RequestHandler = async (req, res, next) => {
    const newNote = new Note(req.body.note);
    const user = req.user as IUser
    await User.updateOne(user,{ $push: { notes: newNote } });
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
    const pages = req.pages!
    const { category } = req.params
    const user = req.user as IUser
    const { notes } = await User.findById(user._id).select('notes').populate('notes')
    const notesByCat = getNotesByCategory(notes, category)
    const extendedPages = extendPageData(pages, notesByCat)
    const pagedNotes = getNotesForPage(extendedPages, notesByCat)
    const sorters: Sorter = getSorters(notes)
    res.locals.pages = extendedPages
    res.locals.activeCategory = category
    res.render('notes/category', { sorters, notes: pagedNotes })
}

export const getTags = async (req:Request, res:Response) => {
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
    const pages = req.pages!
    const { tag } = req.params
    const user = req.user as IUser
    const { notes } = await User.findById(user._id).select('notes').populate('notes')
    const notesByTag = getNotesByTags(notes, tag)
    const extendedPages = extendPageData(pages, notesByTag)
    const pagedNotes = getNotesForPage(extendedPages, notesByTag)
    const sorters: Sorter = getSorters(notes)
    res.locals.pages = extendedPages
    res.locals.activeTag= tag
    res.render('notes/tags', { sorters, notes: pagedNotes })
}