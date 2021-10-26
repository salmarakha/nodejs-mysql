const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsgs = [];
        errors.array().map(err => errorMsgs.push({ [err.param]: err.msg }));
        return res.status(400).json({ errors: errorMsgs });
    }
    next();
}

module.exports = validate;