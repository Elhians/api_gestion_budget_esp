const express = require('express');
const router = express.Router();
const validationController = require('../controllers/validation.controller');


router.post('/create', validationController.createValidation);
router.get('/getAll', validationController.getAllValidations);
router.get('/get/:id', validationController.getValidationById);
router.delete('/del/:id', validationController.deleteValidation);

module.exports = router;