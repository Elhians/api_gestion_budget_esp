const express = require('express');
const router = express.Router();
const controller = require('../controllers/settings.controller');

router.get('/', controller.get);
router.put('/', controller.update); 

module.exports = router;