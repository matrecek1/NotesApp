import { RequestHandler } from "express";
import {Note} from '../models/notes'



export const index: RequestHandler = async(req, res) => {
    const notes = await Note.find()
    res.render("notes/index", {notes})
}

export const newNoteForm: RequestHandler = (req, res) => {
    res.render('notes/new')
}

export const createNote: RequestHandler = async(req, res, next) => {
        console.log(req.body.note);
        const newNote = new Note(req.body.note);
        await newNote.save();
        res.redirect('/notes')
}

export const showNote: RequestHandler<{id:string}> = async(req, res, next) => {
        const note = await Note.findById(req.params.id);
        res.render('notes/show', {note})
}

export const editNoteForm:RequestHandler<{id:string}> = async(req, res, next) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit', {note})
}

export const updateNote:RequestHandler<{id: string}> = async(req, res, next) => {
    const {id} = req.params
    console.log(req.body);
    const note = await Note.findByIdAndUpdate(id, {...req.body.note})
    if(note) {
        console.log(note);
        note.save()
        res.redirect('/notes/' + id)
    }
    throw new Error('note didnt update')
}

export const deleteNote:RequestHandler<{id: string}> = async(req, res, next) =>{
    const {id} = req.params
    const note = await Note.findByIdAndDelete(id)
    res.redirect('/notes')
}

