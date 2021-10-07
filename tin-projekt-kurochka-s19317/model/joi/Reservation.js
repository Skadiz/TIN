const Joi = require('joi');
 
const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "number.base":
                err.message = "Pole jest wymagane";
                break;
            case "date.base":
                err.message = "Pole jest wymagane";
                break
            case "date.greater":
                err.message = "Data Od musi być mniejsza za Data Do";
                break
             case "date.max":
                err.message = `Data nie może być z przyszłości`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const reservationSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    guestId: Joi.number()
        .required()
        .error(errMessages),
    roomId: Joi.number()
        .required()
        .error(errMessages),
    dateFrom: Joi.date()
        .required()
        .error(errMessages)        
        ,
    dateTo: Joi.date()
        .greater(Joi.ref('dateFrom'))
        .required()
        .error(errMessages)
        
});

module.exports = reservationSchema;