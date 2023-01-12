import { RequestHandler } from "express";
import { INote } from "../../models/notes";

export const addDate:RequestHandler = (req, res, next) => {
    const {note}:{note:INote} = req.body;
    note.dateOfCreation = new Date()
    next()
}