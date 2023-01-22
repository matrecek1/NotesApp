import { Pages } from "../middleware/notes/pages";
import { INote } from "../models/notes";

interface ExtendedPages extends Pages{
    numOfPages: number;
    skip: number;
}

export const extendPageData = (pages:Pages, notes:INote[]):ExtendedPages =>{
    const noteCount = notes.length
    const pageCount = Math.ceil(noteCount===0? 1:noteCount / pages.notesPerPage)
    const extendedPages: ExtendedPages = {
        ...pages,
        numOfPages:pageCount,
        skip: pages.currentPage * pages.notesPerPage
    }
    return extendedPages
}


    //const notes = await Note.find().skip(skip).limit(pages.notesPerPage)

export const getNotesForPage =(pages:ExtendedPages, notes:INote[]):INote[] =>{
    const pagedNotes:INote[] = []
    for(let i = pages.skip; i < pages.skip+pages.notesPerPage;i++){
        if(!notes[i]) return pagedNotes
        pagedNotes.push(notes[i])
    }
    return pagedNotes
}