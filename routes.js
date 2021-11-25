const express = require('express');

const router = express.Router();

const routes = require('./lib/route');

router.use('/v1', routes);

module.exports = router;
