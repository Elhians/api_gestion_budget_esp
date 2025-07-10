const express = require('express');
const router = express.Router();
const controller = require('../controllers/activitylog.controller');


router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.delete('/', controller.removeAll);

module.exports = router;