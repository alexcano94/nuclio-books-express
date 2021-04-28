const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const Ajv = require("ajv");
const ajv = new Ajv();

const bookCreateSchema = {
    type: "object",
    properties: {
      title: {type: "string"},
      author: {type: "string"},
      isbn: {type: "string"},
      numPages: {type: "number"}, 
      categories: {type: "array", uniqueItems: true},
    },
    required: ["title", "author", "isbn", "numPages", "categories"],
    additionalProperties: false
};

const bookUpdateSchema = {
    type: "object",
    properties: {
      title: {type: "string"},
      author: {type: "string"},
      isbn: {type: "string"},
      booked: {type: "boolean"},
      numPages: {type: "number"}, 
      categories: {type: "array", uniqueItems: true},
    },
    required: ["title", "author", "isbn", "numPages", "booked", "categories"],
    additionalProperties: false
};


const bookPatchSchema = {
    type: "object",
    properties: {
      title: {type: "string"},
      author: {type: "string"},
      isbn: {type: "string"},
      booked: {type: "boolean"},
      numPages: {type: "number"}, 
      categories: {type: "array", uniqueItems: true},
    },
    required: [],
    additionalProperties: false
};

const validateBook = (schema, data) => {
    return ajv.validate(schema, data);
}

const entityExists = (entity, id) => {
    const element = db.get(entity)
    .find({ id: id })
    .value();
    return element;
};

module.exports = {
    entityExists,
    validateBook,
    bookCreateSchema,
    bookUpdateSchema,
    bookPatchSchema,
}