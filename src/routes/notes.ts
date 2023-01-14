import { Router } from "express";
const router = Router()
import { catchAsync } from "../utils/catchAync";
import { addDate } from "../middleware/notes/addDate";
import { createNote, deleteNote, editNoteForm, index, newNoteForm, showNote, updateNote, getCategories } from "../controllers/notes";

router.post('/', addDate,catchAsync(createNote))

router.get('/new', newNoteForm)

router.get('/', catchAsync(index))

router.put('/:id', catchAsync(updateNote))

router.get('/:id', catchAsync(showNote))

router.get('/:id/edit', catchAsync(editNoteForm))

router.delete('/:id', catchAsync(deleteNote))

router.get('/categories/:category', catchAsync(getCategories))


export default router