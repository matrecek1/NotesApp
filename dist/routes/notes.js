"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const catchAync_1 = require("../utils/catchAync");
const addDate_1 = require("../middleware/notes/addDate");
const pages_1 = require("../middleware/notes/pages");
const notes_1 = require("../controllers/notes");
router.post('/', addDate_1.addDate, (0, catchAync_1.catchAsync)(notes_1.createNote));
router.get('/new', notes_1.newNoteForm);
router.get('/', pages_1.getPageData, (0, catchAync_1.catchAsync)(notes_1.index));
router.put('/:id', (0, catchAync_1.catchAsync)(notes_1.updateNote));
router.get('/:id', (0, catchAync_1.catchAsync)(notes_1.showNote));
router.get('/:id/edit', (0, catchAync_1.catchAsync)(notes_1.editNoteForm));
router.delete('/:id', (0, catchAync_1.catchAsync)(notes_1.deleteNote));
router.get('/categories/:category', (0, catchAync_1.catchAsync)(notes_1.getCategories));
router.get('/tags/:tag', (0, catchAync_1.catchAsync)(notes_1.getTags));
exports.default = router;
//# sourceMappingURL=notes.js.map