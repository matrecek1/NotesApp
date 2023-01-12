"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const catchAync_1 = require("../utils/catchAync");
const addDate_1 = require("../middleware/notes/addDate");
const notes_1 = require("../controllers/notes");
router.post('/', addDate_1.addDate, (0, catchAync_1.catchAsync)(notes_1.createNote));
router.get('/new', notes_1.newNoteForm);
router.get('/', (0, catchAync_1.catchAsync)(notes_1.index));
router.get('/:id', (0, catchAync_1.catchAsync)(notes_1.showNote));
router.patch('/:id', (0, catchAync_1.catchAsync)(notes_1.updateNote));
router.delete('/:id', (0, catchAync_1.catchAsync)(notes_1.deleteNote));
exports.default = router;
//# sourceMappingURL=notes.js.map