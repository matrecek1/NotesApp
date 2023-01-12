"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    noteBody: {
        type: String,
        required: true
    },
    category: {
        String,
    },
    tags: [String],
    dateOfCreation: {
        type: Date,
        required: true
    }
});
exports.Note = (0, mongoose_1.model)('Note', noteSchema);
//# sourceMappingURL=notes.js.map