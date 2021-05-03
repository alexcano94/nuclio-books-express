const express = require('express');
const authorRouter = express.Router();

const authorService = require('./../model/authors');
const authorValidations = require('./../services/authorValidations');

authorRouter.post('', async (req, res) => {
    const { body } = req;
    let valid = authorValidations.validateAuthor(authorValidations.authorCreateSchema, body);
    if (valid) {
        const exists = await authorValidations.authorExistsName(body.name);
        if(!exists) {
            const id = await authorService.createAuthor(body);
            return res.status(201).json({message: `Author created with id: ${id}`});
        }
        return res.status(400).json({message: `Author with name ${body.name} already exists`});
    } else {
        return res.status(400).json({message: 'Invalid author schema'});
    }
});

authorRouter.get('', async (req, res) => {
    res.status(200).json( await authorService.getAllAuthors());
});

authorRouter.get('/:id', async (req, res) => {
    const author = await authorService.getAuthorById(req.params.id);
    if (author) {
        return res.status(200).json(author); 
    } else {
        return res.status(404).json({message: `Author with id: ${req.params.id} was not found`}); 
    }
});

authorRouter.delete('/:id', async (req, res) => {
    const author = await authorValidations.entityExists('author', req.params.id);
    if (author) {
        await authorService.deleteAuthor(req.params.id);
        return res.status(200).json({message: `Author with id: ${req.params.id} was deleted`}); 
    } else {
        return res.status(404).json({message: `Author with id: ${req.params.id} was not found`}); 
    }
});


authorRouter.put('/:id', async (req, res) => {
    const author = await authorValidations.entityExists('author', req.params.id);
    if (author) {
        const { body } = req;
        let valid = authorValidations.validateAuthor(authorValidations.authorUpdateSchema, body);
        if (valid) {
            const exists = await authorValidations.authorExistsName(body.name);
            if(!exists) {
                await authorService.updateAuthor(req.params.id, body);
                return res.status(200).json({message: `Author with id: ${req.params.id} was updated`}); 
            }
            return res.status(400).json({message: `Author with name ${body.name} already exists`});
        } else {
            return res.status(400).json({message: 'Invalid author update schema'});
        }
    } else {
        return res.status(404).json({message: `Author with id: ${req.params.id} was not found`}); 
    }
});


authorRouter.patch('/:id', async (req, res) => {
    const author = await authorValidations.entityExists('author', req.params.id);
    if (author) {
        const { body } = req;
        let valid = authorValidations.validateAuthor(authorValidations.authorPatchSchema, body);
        if (valid) {
            const exists = await authorValidations.authorExistsName(body.name);
            if(!exists) {
                await authorService.patchAuthor(req.params.id, body);
                return res.status(200).json({message: `Author with id: ${req.params.id} was updated`}); 
            }
            return res.status(400).json({message: `Author with name ${body.name} already exists`});
        } else {
            return res.status(400).json({message: 'Invalid author update schema'});
        }
    } else {
        return res.status(404).json({message: `Author with id: ${req.params.id} was not found`}); 
    }
});

module.exports = {
    authorRouter,
}