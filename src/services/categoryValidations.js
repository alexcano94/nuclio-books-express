const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const Ajv = require("ajv");
const ajv = new Ajv();

const categoryCreateSchema = {
    type: "object",
    properties: {
      name: {type: "string"},
    },
    required: ["name"],
    additionalProperties: false
};

const categoryUpdateSchema = {
    type: "object",
    properties: {
      name: {type: "string"},
    },
    required: ["name"],
    additionalProperties: false
};

const categoryPatchSchema = {
    type: "object",
    properties: {
      name: {type: "string"},
    },
    required: [],
    additionalProperties: false
};


const validateCategory = (schema, data) => {
    return ajv.validate(schema, data);
}

const entityExists = (entity, id) => {
    const element = db.get(entity)
    .find({ id: id })
    .value();
    return element;
};

const categoryExistsName = (name) => {
    const element = db.get('categories')
    .find({ name })
    .value();
    return !!element;
}

module.exports = {
    entityExists,
    categoryExistsName,
    validateCategory,
    categoryCreateSchema,
    categoryPatchSchema,
    categoryUpdateSchema,
}