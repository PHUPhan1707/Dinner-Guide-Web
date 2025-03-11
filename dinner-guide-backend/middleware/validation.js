const { body, validationResult } = require("express-validator");

const handleValidationErrors = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const validateUpdateUser = [
    body('username').optional().isString().trim().notEmpty()
        .withMessage('Username must be a non-empty string'),
    body('email').optional().isEmail()
        .withMessage('Must be a valid email'),
    body('address').optional().isString().trim()
        .withMessage('Address must be a string'),
    body('phone').optional().isString().trim()
        .withMessage('Phone must be a string'),
    body('country').optional().isString().trim()
        .withMessage('Country must be a string'),
    body('city').optional().isString().trim()
        .withMessage('City must be a string'),
    handleValidationErrors
];

module.exports = { validateUpdateUser };
   


