// routes/csvRoutes.js

const express = require('express');
const {csvToJson} = require('../service/index');

const router = express.Router();

// Define routes
router.get('/csv-to-json', csvToJson);

module.exports = router;
