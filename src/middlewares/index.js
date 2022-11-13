const { body, validationResult, oneOf } = require('express-validator');
const { logger } = require('../services/logger');

const validateSchemes = () => [
    body('hostAddr').not().isEmpty(),
    body('packetSpeed').not().isEmpty(),
    body('timeout').not().isEmpty().isInt(),
    oneOf([
        body('count').isEmpty(),
        body('count').not().isEmpty().isInt({ min: 1 }),
    ]),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('[product]: validation error');
        return res.status(422).json({
            errors: errors.array(),
        });
    }
    next();
    return null;
};

module.exports = { validate, validateSchemes };
