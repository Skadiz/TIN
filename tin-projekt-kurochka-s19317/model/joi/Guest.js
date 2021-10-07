const Joi = require('joi');

const errMessages = (errors) => { 
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki!`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki!`;
                break;
            case "date.base":
                err.message = "Pole jest wymagane";
                break;
            case "date.max":
                err.message = `Data nie może być z przyszłości`;
                break;    
            default:
                break;
        }
    });
    return errors;
}



const guestSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    firstName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages)        
        ,
    lastName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages)
        ,
    pesel: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages)
,
    dateOfBirth: Joi.date()
        .max('now')
        .required()
        .error(errMessages)

});

module.exports = guestSchema;