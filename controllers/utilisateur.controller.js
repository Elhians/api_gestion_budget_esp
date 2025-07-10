const utilisateurService = require('../services/utilisateur.service');

/**
 * Route POST /utilisateurs
 * Crée un nouvel utilisateur.
 * @param {Object} req.body - Données utilisateur.
 * @returns {Object} - Utilisateur créé.
 * @throws 400 en cas de données invalides.
 */
exports.createUtilisateur = async (req, res) => {
    try {
        console.log('les userdata: ',req.body);
        const utilisateur = await utilisateurService.createUtilisateur(req.body);
        res.status(201).json(utilisateur);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * Route GET /utilisateurs
 * Récupère tous les utilisateurs.
 * @returns {Array} - Liste des utilisateurs.
 * @throws 500 en cas d’erreur serveur.
 */
exports.getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await utilisateurService.getAllUtilisateurs();
        res.status(200).json(utilisateurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Route GET /utilisateurs/:id
 * Récupère un utilisateur par ID.
 * @param {string} req.params.id - ID utilisateur.
 * @returns {Object} - Utilisateur trouvé.
 * @throws 404 si non trouvé.
 */
exports.getUtilisateurById = async (req, res) => {
    try {
        const utilisateur = await utilisateurService.getUtilisateurById(req.params.id);
        res.status(200).json(utilisateur);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/**
 * Route DELETE /utilisateurs/:id
 * Supprime un utilisateur.
 * @param {string} req.params.id - ID utilisateur.
 * @returns {Object} - Confirmation de suppression.
 * @throws 404 si non trouvé.
 */
exports.deleteUtilisateur = async (req, res) => {
    try {
        const result = await utilisateurService.deleteUtilisateur(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


/**
 * Route PUT /utilisateurs/:id
 * Met à jour un utilisateur.
 * @param {string} req.params.id - ID utilisateur.
 * @param {Object} req.body - Données à mettre à jour.
 * @returns {Object} - Utilisateur mis à jour.
 * @throws 404 si non trouvé.
 * @throws 400 en cas de données invalides.
 */
exports.updateUtilisateur = async (req, res) => {
    try {
        const utilisateur = await utilisateurService.updateUtilisateur(req.params.id, req.body);
        res.status(200).json(utilisateur);
    } catch (err) {
        const statusCode = err.message.includes("non trouvé") ? 404 : 400;
        res.status(statusCode).json({ message: err.message });
    }
};