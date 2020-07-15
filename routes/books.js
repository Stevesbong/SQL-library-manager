const express = require('express');

const router = express.Router();
const db = require('../db');
const { Book } = db.models;

function asyncHandler(callback) {
    return async(req, res, next) => {
        try {
            await callback(req, res, next);
        } catch(err) {
            next(err);
        }
    }
}

// Shows the full list of books
router.get('/', asyncHandler( async(req, res) => {
    const books = await Book.findAll();
    res.render('allbooks', { books });
}))

// Shows the create new book form
router.get('/new', asyncHandler( async(req, res) => {
    res.render('new_book');
}))

// Posts a new book to the database.
router.post('/new', asyncHandler( async(req, res) => {
    let book;
    try {
        book = await Book.create(req.body);
        res.redirect('/books');
    } catch(error) {
        if(error.name === "SequelizeValidationError") {
            book = await Book.build(req.body);
            res.render('new_book', { book, validationErrors: error.errors })
        } else {
            throw error;
        }
    }
}))

// Shows book detail form.
router.get('/:id', asyncHandler( async(req, res) => {
    const oneBook = await Book.findByPk(req.params.id)
    if(oneBook) {
        res.render('update_book', { oneBook });
    } else {
        res.status(404);
        res.render('page_not_found');
    }
}))

// Updates book info in the Database.
router.post('/:id/edit', asyncHandler( async(req, res) => {
    let oneBook;
    try {
        oneBook = await Book.findByPk(req.params.id);
        if(oneBook) {
            await oneBook.update(req.body);
            res.redirect('/books')
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        if(error.name === "SequelizeValidationError") {
            oneBook = await Book.build(req.body);
            oneBook.id = req.params.id
            res.render('update_book', { oneBook, validationErrors: error.errors })
        } else {
            throw error;
        }
    }
}))

// Deletes a book.
router.post('/:id/delete', asyncHandler( async(req, res) => {
    const oneBook = await Book.findByPk(req.params.id);
    if(oneBook) {
        await oneBook.destroy();
        res.redirect('/books');
    } else {
        res.sendStatus(404);
    }
}))


module.exports = router;