import { RequestHandler, Request, Response, NextFunction } from "express";
import {Note} from '../../models/notes'

export interface Pages {
    currentPage: number;
    numOfPages: number;
    notesPerPage: number;
}



export const getPageData = async(req:Request, res:Response, next: NextFunction) => {
    const notesPerPage = 18
    const { p } = req.query
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
    req.pages = pages
    next()
}
