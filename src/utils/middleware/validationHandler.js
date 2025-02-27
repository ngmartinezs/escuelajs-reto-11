const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

function validate(data, schema)
{
    const { error } = joi.object(schema).validate(data); 
    return error;
}

function validationHandler(schema,check= "body")
{
    
    return function(req, res, next){
        console.log('valida', req.body);
        const error = validate(req[check],schema);
        error ? next(boom.badRequest(error)) : next();
    };
}

module.exports = validationHandler;