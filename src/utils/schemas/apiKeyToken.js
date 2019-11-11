const joi = require('@hapi/joi');

const apiKeyTokenSchema ={
    apiKeyToken: joi.required()
}

module.exports = apiKeyTokenSchema;