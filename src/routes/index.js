const express = require('express');

const { validateSchemes, validate } = require('../middlewares/index');
const { executeCommand } = require('../controllers/index');

const router = express.Router();

router.post('/', validateSchemes(), [validate], executeCommand);

module.exports = router;
