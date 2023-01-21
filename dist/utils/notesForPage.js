"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotesForPage = exports.extendPageData = void 0;
const extendPageData = (pages, notes) => {
    const noteCount = notes.length;
    const pageCount = Math.ceil(noteCount / pages.notesPerPage);
    const numOfPages = pageCount;
    const skip = pages.currentPage * pages.notesPerPage;
    const extendedPages = Object.assign(Object.assign({}, pages), { numOfPages,
        skip });
    return extendedPages;
};
exports.extendPageData = extendPageData;
//const notes = await Note.find().skip(skip).limit(pages.notesPerPage)
const getNotesForPage = (pages, notes) => {
    const pagedNotes = [];
    for (let i = pages.skip; i < pages.skip + pages.notesPerPage; i++) {
        if (!notes[i])
            return pagedNotes;
        pagedNotes.push(notes[i]);
    }
    return pagedNotes;
};
exports.getNotesForPage = getNotesForPage;
//# sourceMappingURL=notesForPage.js.map