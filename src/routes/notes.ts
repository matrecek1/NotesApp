import { Router } from "express";
const router = Router()
import { catchAsync } from "../utils/catchAync";
import { addDate } from "../middleware/notes/addDate";
import { createNote, deleteNote, index, newNoteForm, showNote, updateNote } from "../controllers/notes";

router.post('/', addDate,catchAsync(createNote))

router.get('/new', newNoteForm)

router.get('/', catchAsync(index))

router.get('/:id', catchAsync(showNote))

router.patch('/:id', catchAsync(updateNote))

router.delete('/:id', catchAsync(deleteNote))

export default router