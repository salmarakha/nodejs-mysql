const { body } = require("express-validator");

const registerationValidation = [
    body('firstname')
    .exists({ checkFalsy: true })
    .withMessage("firstname is required"),

    body('lastname')
    .exists({ checkFalsy: true })
    .withMessage("lastname is required"),

    body('email')
    .isEmail()
    .withMessage("Invalid email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required"),

    body('password')
    .exists({ checkFalsy: true })
    .withMessage("Password field is required")
    .isLength({ min: 4 })
    .withMessage("Minimum password length is 4"),
];

const loginValidation = [
    body('email')
    .isEmail()
    .withMessage("Invalid email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required"),

    body('password')
    .exists({ checkFalsy: true })
    .withMessage("Password field is required")
    .isLength({ min: 4 })
    .withMessage("Minimum password length is 4"),
];

module.exports = {
    registerationValidation,
    loginValidation,
}