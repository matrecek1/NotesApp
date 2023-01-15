"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotesByTags = exports.getNotesByCategory = exports.getSorters = void 0;
const getSorters = (notes) => {
    let sorters = {
        categories: [],
        tags: []
    };
    for (let note of notes) {
        if (note.category) {
            sorters.categories.push(note.category);
        }
        if (note.tags) {
            sorters.tags.push(...note.tags);
        }
    }
    return sorters;
};
exports.getSorters = getSorters;
const getNotesByCategory = (notes, category) => {
    const notesByCat = notes.filter(note => note.category === category);
    return notesByCat;
};
exports.getNotesByCategory = getNotesByCategory;
const getNotesByTags = (notes, tag) => {
    const notesByTags = notes.filter(note => {
        var _a;
        if ((_a = note.tags) === null || _a === void 0 ? void 0 : _a.some(noteTag => noteTag === tag))
            return note;
    });
    return notesByTags;
};
exports.getNotesByTags = getNotesByTags;
//# sourceMappingURL=getSorters.js.map