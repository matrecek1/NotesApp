"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotesByTags = exports.getNotesByCategory = exports.getSorters = void 0;
const getSorters = (notes) => {
    const sorters = {
        categories: [],
        tags: []
    };
    for (const note of notes) {
        if (note.category) {
            if (!sorters.categories.includes(note.category)) {
                sorters.categories.push(note.category);
            }
        }
        if (note.tags) {
            for (const tag of note.tags) {
                if (!sorters.tags.includes(tag)) {
                    sorters.tags.push(tag);
                }
            }
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