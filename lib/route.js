const express = require('express');
const validate = require('../index');
const controller = require('./controller');
const policy = require('./policies');

const router = express.Router();

router.post(
  '/test',
  validate(policy),
  controller,
);

module.exports = router;
