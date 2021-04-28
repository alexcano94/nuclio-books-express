const Ajv = require("ajv");
const ajv = new Ajv();

const searchBookSchema = {
    type: "object",
    properties: {
      author: {type: "string"},
      categories: {type: "array", uniqueItems: true},
    },
    required: [],
    additionalProperties: false
}

const validateSearchQuery = (query) => {
    return ajv.validate(searchBookSchema, query);
}

module.exports = {
    validateSearchQuery,
}