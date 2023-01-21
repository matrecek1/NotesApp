import { RequestHandler, Request, Response, NextFunction } from "express";
import {Note} from '../../models/notes'

export interface Pages {
    currentPage: number;
    notesPerPage: number;
}



export const getPaginationData = async(req:Request, res:Response, next: NextFunction) => {
    const notesPerPage = 18
    const { p } = req.query
    let page: number
    if (typeof p === 'string') page = parseInt(p)
    else page = 0
    const pages: Pages = {
        currentPage: page,
        notesPerPage: notesPerPage
    }
    req.pages = pages
    next()
}
