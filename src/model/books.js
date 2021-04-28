const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({books: []}).write();

const { v4: uuidv4 } = require('uuid');

const createBook = (data) => {
    const id = uuidv4();
    data.id = id;
    data.booked = false;
    db.get('books').push(data).write();
    return id;
};

const getAllBooks = () => {
    return db.get('books').value();
}

const getBookById = (id) => {
    return db.get('books')
    .find({ id })
    .value();
}

const getBookByIsbn = (isbn) => {
    return db.get('books')
    .find({ isbn })
    .value();
}

const deleteBook = (id) => {
    return db.get('books').remove({id}).write();
}

const updateBook = (id, data) => {
    return db.get('books')
    .find({ id })
    .assign(data)
    .write();
}

const patchBook = (id, data) => {
    return db.get('books')
    .find({ id })
    .assign(data)
    .write();
}

const searchBooks = async (query) => {
    const books = await getAllBooks();
    let filterdBooks = [];
    let queriedBooks = [];
    Object.keys(query).forEach((key) => {
        switch (key) {
            case 'author':
                queriedBooks = books.filter(book => book.author === query[key]);
                filterdBooks = [...queriedBooks]; 
                return;
            case 'categories':
                const categories = query[key]; 
                queriedBooks = books.filter((book) => book.categories.some((r) => categories.includes(r)));
                filterdBooks = [...filterdBooks, ...queriedBooks];
                return;
            default:
                return;
        }
    });
    
    return filterdBooks;
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    deleteBook,
    getBookByIsbn,
    updateBook,
    patchBook,
    searchBooks,
}