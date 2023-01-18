import { Router } from "express";
const router = Router()
import { catchAsync } from "../utils/catchAync";
import { addDate } from "../middleware/notes/addDate";
import { getPaginationData } from "../middleware/notes/pages";
import { createNote, deleteNote, editNoteForm, index, newNoteForm, showNote, updateNote, getCategories, getTags } from "../controllers/notes";

router.post('/', addDate, catchAsync(createNote))

router.get('/new', newNoteForm)

router.get('/', getPaginationData, catchAsync(index))

router.put('/:id', catchAsync(updateNote))

router.get('/:id', catchAsync(showNote))

router.get('/:id/edit', catchAsync(editNoteForm))

router.delete('/:id', catchAsync(deleteNote))

router.get('/categories/:category', getPaginationData, catchAsync(getCategories))

router.get('/tags/:tag', getPaginationData, catchAsync(getTags))


export default router