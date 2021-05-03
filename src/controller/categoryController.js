const express = require('express');
const categoryRouter = express.Router();

const categoryService = require('./../model/categories');
const categoryValidations = require('./../services/categoryValidations');

categoryRouter.post('', async (req, res) => {
    const { body } = req;
    let valid = categoryValidations.validateCategory(categoryValidations.categoryCreateSchema, body);
    if (valid) {
        const exists = await categoryValidations.categoryExistsName(body.name);
        if(!exists) {
            const id = await categoryService.createCategory(body);
            res.status(201).json({message: `Category created with id: ${id}`});
        }
        res.status(400).json({message: `Category with name ${body.name} already exists`});
    } else {
        res.status(400).json({message: 'Invalid category schema'});
    }
});

categoryRouter.get('', async (req, res) => {
    res.status(200).json( await categoryService.getAllCategories());
});

categoryRouter.get('/:id', async (req, res) => {
    const category = await categoryService.getCategoryById(req.params.id);
    if (category) {
        res.status(200).json(category); 
    } else {
        res.status(404).json({message: `Category with id: ${req.params.id} was not found`}); 
    }
});

categoryRouter.delete('/:id', async (req, res) => {
    const category = await categoryValidations.entityExists('categories', req.params.id);
    if (category) {
        await categoryService.deleteCategory(req.params.id);
        res.status(200).json({message: `Category with id: ${req.params.id} was deleted`}); 
    } else {
        res.status(404).json({message: `Category with id: ${req.params.id} was not found`}); 
    }
});


categoryRouter.put('/:id', async (req, res) => {
    const category = await categoryValidations.entityExists('categories', req.params.id);
    if (category) {
        const { body } = req;
        let valid = categoryValidations.validateCategory(categoryValidations.categoryUpdateSchema, body);
        if (valid) {
            const exists = await categoryValidations.categoryExistsName(body.name);
            if(!exists) {
                await categoryService.updateCategory(req.params.id, body);
                res.status(200).json({message: `Category with id: ${req.params.id} was updated`}); 
            }
            res.status(400).json({message: `Category with name ${body.name} already exists`});
        } else {
            res.status(400).json({message: 'Invalid category update schema'});
        }
    } else {
        res.status(404).json({message: `Category with id: ${req.params.id} was not found`}); 
    }
});


categoryRouter.patch('/:id', async (req, res) => {
    const category = await categoryValidations.entityExists('categories', req.params.id);
    if (category) {
        const { body } = req;
        let valid = categoryValidations.validateCategory(categoryValidations.categoryPatchSchema, body);
        if (valid) {
            const exists = await categoryValidations.categoryExistsName(body.name);
            if(!exists) {
                await categoryService.patchCategory(req.params.id, body);
                res.status(200).json({message: `Category with id: ${req.params.id} was updated`}); 
            }
            res.status(400).json({message: `Category with name ${body.name} already exists`});
        } else {
            res.status(400).json({message: 'Invalid category update schema'});
        }
    } else {
        res.status(404).json({message: `Category with id: ${req.params.id} was not found`}); 
    }
});

module.exports = {
    categoryRouter,
}