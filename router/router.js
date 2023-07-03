const express = require('express');
const { countByCategory, countByDate } = require('../controller/controller');
const router = express.Router();

router.get('/countByCategory',  countByCategory);
router.get('/countByDate',  countByDate);

module.exports = router;