const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const { v4: uuidv4 } = require('uuid');

const createCategory = (data) => {
    const id = uuidv4();
    data.id = id;
    db.get('categories').push(data).write();
    return id;
};

const getAllCategories = () => {
    return db.get('categories').value();
}

const getCategoryById = (id) => {
    return db.get('categories')
    .find({ id })
    .value();
}

const getCategoryByName = (name) => {
    return db.get('categories')
    .find({ name })
    .value();
}

const deleteCategory = (id) => {
    return db.get('categories').remove({id}).write();
}

const updateCategory = (id, data) => {
    return db.get('categories')
    .find({ id })
    .assign(data)
    .write();
}

const patchCategory = (id, data) => {
    return db.get('categories')
    .find({ id })
    .assign(data)
    .write();
}


module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
    patchCategory,
}