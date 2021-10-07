const Joi = require('joi');
 
const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "number.base":
                err.message = `Pole jest wymagane`;
                break;
            case "number.min":
                err.message = `Pole powinno być co najmniej ${err.local.limit} `;
                break;
            case "number.max":
                err.message = `Pole powinno być co najwyżej ${err.local.limit}`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const roomSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    roomNumber: Joi.number()
        .min(100)
        .max(500)
        .required()
        .error(errMessages)        
        ,
    type: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages)
        ,
    price: Joi.number()
        .min(1)
        .required()
        .error(errMessages)
,
    numberOfPlaces: Joi.number()
        .min(1)
        .max(5)
        .required()
        .error(errMessages)
});

module.exports = roomSchema;