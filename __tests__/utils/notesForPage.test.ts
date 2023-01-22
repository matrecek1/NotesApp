import { Pages } from '../../src/middleware/notes/pages'
import { INote } from '../../src/models/notes'
import {extendPageData, getNotesForPage} from '../../src/utils/notesForPage'


const pages:Pages = {
    currentPage: 0,
    notesPerPage: 18
}

const note: INote = {
    title: "Note",
    noteBody: "This is note body",
    dateOfCreation: new Date(),
    category: "Category",
    tags: ["Tag1", "tag2", 'tag3']
}

describe('extendPage utility', () =>{
    const pages: Pages = {
        currentPage: 0,
        notesPerPage: 18
    }
    const notes: INote[] = []
    notes.push(note)
    test("has 1 page", () =>{
        const extendedPages = extendPageData(pages, notes)
        expect(notes.length).toBe(1)
        expect(extendedPages.numOfPages).toBeTruthy()
        expect(extendedPages.numOfPages).toStrictEqual(1)
        expect(extendedPages.skip).toStrictEqual(0)
        expect(extendedPages.currentPage).toBe(0)
        expect(extendedPages.notesPerPage).toBe(18)
    })
    test('has 2 pages and current is 1(0)', () =>{
        for(let i = 0; i <= 18; i++){
            notes.push(note)
        }
        expect(notes.length).toBe(20)
        const extendedPages = extendPageData(pages, notes)
        expect(extendedPages.numOfPages).toStrictEqual(2)
        expect(extendedPages.skip).toStrictEqual(0)
        expect(extendedPages.currentPage).toBe(0)
        expect(extendedPages.notesPerPage).toBe(18)
    })
    test('has 2 pages and current is 2(1)', () => {
        pages.currentPage = 1
        expect(notes.length).toBe(20)
        const extendedPages = extendPageData(pages, notes)
        expect(extendedPages.numOfPages).toStrictEqual(2)
        expect(extendedPages.skip).toStrictEqual(18)
        expect(extendedPages.currentPage).toBe(1)
        expect(extendedPages.notesPerPage).toBe(18)
    })
})
describe("getNotesForPage utility", ()=>{
    const pages: Pages = {
        currentPage: 0,
        notesPerPage: 18
    }
    const notes: INote[] = []
    notes.push(note)
    test('getNotesForPage with 1 note', ()=>{
        const extendedPages = extendPageData(pages, notes)
        const notesForPage = getNotesForPage(extendedPages, notes)
        expect(notesForPage.length).toBe(1)
    })
    test('with 20 notes page 1(0)', ()=>{
        for (let i = 0; i <= 18; i++) {
            notes.push(note)
        }
        const extendedPages = extendPageData(pages, notes)
        const notesForPage = getNotesForPage(extendedPages, notes)
        expect(notes.length).toBe(20)
        expect(notesForPage.length).toBe(18)
    })
    test('with 20 notes page 2(1)', () => {
        pages.currentPage = 1
        const extendedPages = extendPageData(pages, notes)
        const notesForPage = getNotesForPage(extendedPages, notes)
        expect(notes.length).toBe(20)
        expect(notesForPage.length).toBe(2)
    })
})