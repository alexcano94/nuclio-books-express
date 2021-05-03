const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const { v4: uuidv4 } = require('uuid');

const createAuthor = (data) => {
    const id = uuidv4();
    data.id = id;
    db.get('authors').push(data).write();
    return id;
};

const getAllAuthors = () => {
    return db.get('authors').value();
}

const getAuthorById = (id) => {
    return db.get('authors')
    .find({ id })
    .value();
}

const getAuthorByName = (name) => {
    return db.get('authors')
    .find({ name })
    .value();
}

const deleteAuthor = (id) => {
    return db.get('authors').remove({id}).write();
}

const updateAuthor = (id, data) => {
    return db.get('authors')
    .find({ id })
    .assign(data)
    .write();
}

const patchAuthor = (id, data) => {
    return db.get('authors')
    .find({ id })
    .assign(data)
    .write();
}


module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    deleteAuthor,
    updateAuthor,
    patchAuthor,
}