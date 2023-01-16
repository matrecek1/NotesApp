import { RequestHandler } from "express";
import {Note} from '../../models/notes'
export interface Pages {
    currentPage: number;
    numOfPages: number;
    notesPerPage: number;
}

export const getPageData:RequestHandler = async(req, res, next) => {
    const notesPerPage = 18
    const { p } = req.query
    console.log(p);
    let page: number
    if (typeof p === 'string') page = parseInt(p)
    else page = 0
    const noteCount = await Note.estimatedDocumentCount()
    const pageCount = Math.ceil(noteCount / notesPerPage)
    const pages: Pages = {
        currentPage: page,
        numOfPages: pageCount,
        notesPerPage: notesPerPage
    }
    res.locals.pages = pages
    next()
}
