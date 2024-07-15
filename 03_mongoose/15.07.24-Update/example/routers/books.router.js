import express from 'express';
import { addBook, deleteBook, getBookList, updateBook } from '../controllers/books.controller.js';
const router = express.Router();

router.route('/')
    .get(getBookList)
    .post(addBook)

router.route('/:bid')
    .put(updateBook)
    .delete(deleteBook)


export default router;