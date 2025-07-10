const { Departement } = require('../models');

/**
 * Route POST /departements
 * Crée un nouveau département.
 * @param {Object} req.body - Données du département.
 * @returns {Object} - Département créé.
 * @throws 400 en cas de données invalides.
 */
exports.createDepartement = async (req, res) => {
    try {
        const departement = await Departement.create(req.body);
        res.status(201).json(departement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * Route GET /departements
 * Récupère tous les départements.
 * @returns {Array} - Liste des départements.
 * @throws 500 en cas d’erreur serveur.
 */
exports.getAllDepartements = async (req, res) => {
    try {
        const departements = await Departement.findAll();
        // console.log('les departements trouves : ',departements);
        res.json(departements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Route GET /departements/:id
 * Récupère un département par ID.
 * @param {string} req.params.id - ID du département.
 * @returns {Object} - Département trouvé.
 * @throws 404 si non trouvé, 500 en cas d’erreur.
 */
exports.getDepartementById = async (req, res) => {
    try {
        const departement = await Departement.findByPk(req.params.id);
        if (!departement) return res.status(404).json({ message: 'Département non trouvé' });
        res.json(departement);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Route PUT /departements/:id
 * Met à jour un département.
 * @param {string} req.params.id - ID du département.
 * @param {Object} req.body - Données à mettre à jour.
 * @returns {Object} - Département mis à jour.
 * @throws 404 si non trouvé, 400 en cas de données invalides.
 */
exports.updateDepartement = async (req, res) => {
    try {
        const [updated] = await Departement.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Département non trouvé' });
        const departement = await Departement.findByPk(req.params.id);
        res.json(departement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * Route DELETE /departements/:id
 * Supprime un département.
 * @param {string} req.params.id - ID du département.
 * @returns {204} - Pas de contenu.
 * @throws 404 si non trouvé, 500 en cas d’erreur serveur.
 */
exports.deleteDepartement = async (req, res) => {
    try {
        const deleted = await Departement.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Département non trouvé' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};