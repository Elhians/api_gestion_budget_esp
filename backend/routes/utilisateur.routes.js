const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur.controller');

router.post('/create', utilisateurController.createUtilisateur);
router.get('/getAll', utilisateurController.getAllUtilisateurs);
router.get('/get/:id', utilisateurController.getUtilisateurById);
router.put('/update/:id', utilisateurController.updateUtilisateur);
router.delete('/del/:id', utilisateurController.deleteUtilisateur);

module.exports = router;