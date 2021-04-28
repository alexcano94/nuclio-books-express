const express = require('express');
const bookRouter = express.Router();

const bookService = require('../model/books');

const bookValidations = require('../services/bookValidations');
const { validateSearchQuery } = require('../services/searchValidation');

bookRouter.post('', async (req, res) => {
    const { body } = req;
    let valid = bookValidations.validateBook(bookValidations.bookCreateSchema, body);
    if (valid) {
        const id = await bookService.createBook(body);
        res.status(201).json({message: `Book created with id: ${id}`});
    } else {
        res.status(400).json({message: 'Invalid book schema'});
    }
});

bookRouter.get('', async (req, res) => {
    res.status(200).json( await bookService.getAllBooks());
});

bookRouter.get('/:id', async (req, res) => {
    const book = await bookService.getBookById(req.params.id);
    if (book) {
        res.status(200).json(book); 
    } else {
        res.status(404).json({message: `Book with id: ${req.params.id} was not found`}); 
    }
});

bookRouter.get('/isbn/:isbn', async (req, res) => {
    const book = await bookService.getBookByIsbn(req.params.isbn);
    if (book) {
        res.status(200).json(book); 
    } else {
        res.status(404).json({message: `Book with ISBN: ${req.params.isbn} was not found`}); 
    }
});

bookRouter.delete('/:id', async (req, res) => {
    const book = await bookValidations.entityExists('books', req.params.id);
    if (book) {
        await bookService.deleteBook(req.params.id);
        res.status(200).json({message: `Book with id: ${req.params.id} was deleted`}); 
    } else {
        res.status(404).json({message: `Book with id: ${req.params.id} was not found`}); 
    }
});


bookRouter.put('/:id', async (req, res) => {
    const book = await bookValidations.entityExists('books', req.params.id);
    if (book) {
        const { body } = req;
        let valid = bookValidations.validateBook(bookValidations.bookUpdateSchema, body);
        if (valid) {
            await bookService.updateBook(req.params.id, body);
            res.status(200).json({message: `Book with id: ${req.params.id} was updated`}); 
        } else {
            res.status(400).json({message: 'Invalid book update schema'});
        }
    } else {
        res.status(404).json({message: `Book with id: ${req.params.id} was not found`}); 
    }
});


bookRouter.patch('/:id', async (req, res) => {
    const book = await bookValidations.entityExists('books', req.params.id);
    if (book) {
        const { body } = req;
        let valid = bookValidations.validateBook(bookValidations.bookPatchSchema, body);
        if (valid) {
            await bookService.patchBook(req.params.id, body);
            res.status(200).json({message: `Book with id: ${req.params.id} was updated`}); 
        } else {
            res.status(400).json({message: 'Invalid book update schema'});
        }
    } else {
        res.status(404).json({message: `Book with id: ${req.params.id} was not found`}); 
    }
});

bookRouter.post('/find', async (req, res) => {
    const { query } = req.body;
    const valid = validateSearchQuery(query);
    if (valid) {
        const found = await bookService.searchBooks(query);
        res.status(200).json({found})
    } else {
        res.status(400).json({ message: `Search query incorrect` });
    }
})


module.exports = {
    bookRouter
}