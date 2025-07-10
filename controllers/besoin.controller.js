const besoinService = require('../services/besoin.service');

/**
 * Route POST /besoins
 * Crée un nouveau besoin avec les données fournies.
 * @param {Object} req.body - Données du besoin.
 * @returns {Object} - Besoin créé.
 * @throws 400 en cas de données invalides, 500 en cas d’erreur serveur.
 */
exports.createBesoin = async (req, res, next) => {
    try {
        // console.log('corp de requette de creation de besoin: ',req.body);
        const besoin = await besoinService.createBesoin(req.body);
        res.status(201).json(besoin);
    } catch (err) {
        next(err); // Passage au middleware global de gestion des erreurs
    }
};

/**
 * Route GET /besoins
 * Récupère la liste de tous les besoins.
 * @returns {Array} - Liste des besoins.
 * @throws 500 en cas d’erreur serveur.
 */
exports.getAllBesoins = async (req, res) => {
    try {
        const besoins = await besoinService.getAllBesoins();
        res.status(200).json(besoins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Route GET /besoins/:id
 * Récupère un besoin par son identifiant.
 * @param {string} req.params.id - ID du besoin.
 * @returns {Object} - Besoin correspondant.
 * @throws 404 si besoin non trouvé, 500 en cas d’erreur serveur.
 */
exports.getBesoinById = async (req, res) => {
    try {
        const besoin = await besoinService.getBesoinById(req.params.id);
        res.status(200).json(besoin);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/**
 * Route DELETE /besoins/:id
 * Supprime un besoin par son identifiant.
 * @param {string} req.params.id - ID du besoin.
 * @returns {Object} - Confirmation de suppression.
 * @throws 404 si besoin non trouvé, 500 en cas d’erreur serveur.
 */
exports.deleteBesoin = async (req, res) => {
    try {
        const result = await besoinService.deleteBesoin(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/** * Route PUT /besoins/:id
 * Met à jour un besoin par son identifiant.
 * @param {string} req.params.id - ID du besoin.
 * @param {Object} req.body - Nouvelles données du besoin.
 * @returns {Object} - Besoin mis à jour.
 * @throws 404 si besoin non trouvé, 400 en cas de données invalides, 500 en cas d’erreur serveur.
 */
exports.updateBesoin = async (req, res) => {
    // console.log('updatons',req.params.id);
    try {
        const updatedBesoin = await besoinService.updateBesoin(req.params.id, req.body);
        res.status(200).json(updatedBesoin);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            res.status(400).json({ message: err.errors.map(e => e.message) });
        } else {
            res.status(404).json({ message: err.message });
        }
    }
};
/** * Route GET /besoins/departement
 * Récupère les besoins par département pour le chef de département.
 * @param {Object} req.utilisateur - Utilisateur authentifié.
 * @returns {Array} - Liste des besoins du département.
 * @throws 500 en cas d’erreur serveur.
 */
exports.getBesoinsByDepartementForChef = async (req, res) => {
    const idDepartement = req.utilisateur.idDepartement;
    const result = await besoinService.getBesoinsByDepartementForChef(idDepartement);
    res.json(result);
};
/**
 * Route GET /besoins/departement/:id
 * Récupère les besoins par département pour le directeur.
 * @param {string} req.params.id - ID du département.
 * @returns {Array} - Liste des besoins du département.
 * @throws 500 en cas d’erreur serveur.
 */
exports.getBesoinsByDepartementForDir = async (req, res) => {
    const { id } = req.params;
    const result = await besoinService.getBesoinsByDepartementForDir(id);
    res.json(result);
};
/**
 * Route GET /besoins/user/:id
 * Récupère les besoins d'un utilisateur par son ID.
 * @param {string} req.params.id - ID de l'utilisateur.
 * @returns {Array} - Liste des besoins de l'utilisateur.
 * @throws 500 en cas d’erreur serveur.
 */
exports.getBesoinsByUserId = async (req, res) => {
    const { id } = req.params;
    const result = await besoinService.getAllBesoinsByUserId(id);
    res.json(result);
};

/** * Route POST /besoins/valider/chef/:id
 * Valide un besoin par le chef de département.
 * @param {string} req.params.id - ID du besoin.
 * @param {Object} req.body - Contient le nouveau statut du besoin.
 * @returns {Object} - Résultat de la validation.
 * @throws 500 en cas d’erreur serveur.
 */
exports.validerBesoinByChef = async (req, res) => {
    const { id } = req.params;
    const { newStatut } = req.body;
    const result = await besoinService.validerBesoinByChef(req.utilisateur.id, id, newStatut);
    res.json(result);
};
/**
 * Route POST /besoins/valider/dir/:id
 * Valide un besoin par le directeur.
 * @param {string} req.params.id - ID du besoin.
 * @param {Object} req.body - Contient le nouveau statut du besoin.
 * @returns {Object} - Résultat de la validation.
 * @throws 500 en cas d’erreur serveur.
 */
exports.validerBesoinByDir = async (req, res) => {
    const { id } = req.params;
    const { newStatut } = req.body;
    const result = await besoinService.validerBesoinByDir(req.utilisateur.id, id, newStatut);
    res.json(result);
};


// exports.updateBesoin = async (req, res) => {
//     try {
//         const result = await besoinService.updateBesoin(req.utilisateur, req.params.id, req.body);
//         res.status(200).json(result);
//     } catch (err) {
//         res.status(403).json({ message: err.message });
//     }
// };