"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSorters = void 0;
const getSorters = (notes) => {
    let sorters = {
        categories: [],
        tags: []
    };
    for (let note of notes) {
        if (note.category) {
            sorters.categories.push(note.category);
        }
    }
    return sorters;
};
exports.getSorters = getSorters;
//# sourceMappingURL=getCategories.js.map