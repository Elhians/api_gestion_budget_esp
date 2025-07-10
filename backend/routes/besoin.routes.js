const express = require('express');
const router = express.Router();
const besoinController = require('../controllers/besoin.controller');
const { isChef, isDirecteur, canExpressNeed} = require('../middlewares/auth.middleware');

// Chef : voir les besoins de son département
router.get('/chef/dep', isChef, besoinController.getBesoinsByDepartementForChef);

// Directeur : voir besoins d’un département donné
router.get('/dir/dep/:id', isDirecteur, besoinController.getBesoinsByDepartementForDir);

// Utilisateur : voir ses besoins
router.get('/user/:id', besoinController.getBesoinsByUserId);

router.patch('/:id/valider/chef', isChef, besoinController.validerBesoinByChef);

router.patch('/:id/valider/dir', isDirecteur, besoinController.validerBesoinByDir);

router.post('/create', canExpressNeed, besoinController.createBesoin);

router.get('/getAll', besoinController.getAllBesoins);

router.get('/get/:id', besoinController.getBesoinById);

router.delete('/del/:id', besoinController.deleteBesoin);

router.put('/update/:id', besoinController.updateBesoin);

module.exports = router;