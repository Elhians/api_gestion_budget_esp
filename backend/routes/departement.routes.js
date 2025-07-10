const express = require('express');
const router = express.Router();
const departementController = require('../controllers/departement.controller');

router.post('/create', departementController.createDepartement);
router.get('/getAll', departementController.getAllDepartements);
router.get('/get/:id', departementController.getDepartementById);
router.put('/up/:id', departementController.updateDepartement);
router.delete('/del/:id', departementController.deleteDepartement);

module.exports = router;