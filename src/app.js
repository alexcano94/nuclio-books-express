const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
console.log(db.getState());

if (Object.keys(!db.getState()).length === 0) {
    console.log("entra");
    db.defaults({books: [], authors: [], categories: []}).write();
}

const { bookRouter } = require('./controller/bookController');
const { categoryRouter } = require('./controller/categoryController');
const { authorRouter } = require('./controller/authorController');
const router = express.Router();

const app = express();
const port = 8080;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);
app.use('/book', bookRouter);
app.use('/author', authorRouter);
app.use('/category', categoryRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));