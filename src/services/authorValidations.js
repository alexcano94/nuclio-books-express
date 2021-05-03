const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const Ajv = require("ajv");
const ajv = new Ajv();

const authorCreateSchema = {
    type: "object",
    properties: {
      name: {type: "string"},
    },
    required: ["name"],
    additionalProperties: false
};

const authorUpdateSchema = {
    type: "object",
    properties: {
      name: {type: "string"},
    },
    required: ["name"],
    additionalProperties: false
};

const authorPatchSchema = {
    type: "object",
    properties: {
      name: {type: "string"},
    },
    required: [],
    additionalProperties: false
};


const validateAuthor = (schema, data) => {
    return ajv.validate(schema, data);
}

const entityExists = (entity, id) => {
    const element = db.get(entity)
    .find({ id: id })
    .value();
    return element;
};

const authorExistsName = (name) => {
    const element = db.get('authors')
    .find({ name })
    .value();
    return !!element;
}

module.exports = {
    entityExists,
    authorExistsName,
    validateAuthor,
    authorCreateSchema,
    authorPatchSchema,
    authorUpdateSchema,
}