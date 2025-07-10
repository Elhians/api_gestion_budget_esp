const validationService = require('../services/validation.service');

/**
 * Route POST /validations
 * Crée une nouvelle validation pour un besoin donné.
 * Appelle la méthode validerBesoin du service qui applique la logique métier.
 *
 * @param {Object} req.body - Données de validation (ex : idBesoin, source, statutValidation, idCorrecteur).
 * @returns {Object} - Validation créée.
 * @throws Erreur transmise au middleware global en cas d’échec.
 */
exports.createValidation = async (req, res, next) => {
    try {
        const validation = await validationService.validerBesoin(req.body);
        res.status(201).json(validation);
    } catch (err) {
        next(err);
    }
};

/**
 * Route GET /validations
 * Récupère toutes les validations existantes.
 *
 * @returns {Array} - Liste des validations.
 * @throws Erreur transmise au middleware global en cas d’échec.
 */
exports.getAllValidations = async (req, res, next) => {
    try {
        const validations = await validationService.getAllValidations();
        res.json(validations);
    } catch (err) {
        next(err);
    }
};

/**
 * Route GET /validations/:id
 * Récupère une validation spécifique par son identifiant.
 *
 * @param {string} req.params.id - ID de la validation.
 * @returns {Object} - Validation trouvée.
 * @throws 404 si validation non trouvée.
 * @throws Erreur transmise au middleware global en cas d’autres échecs.
 */
exports.getValidationById = async (req, res, next) => {
    try {
        const validation = await validationService.getValidationById(req.params.id);
        res.json(validation);
    } catch (err) {
        if (err.message === 'Validation non trouvée') {
            return res.status(404).json({ message: err.message });
        }
        next(err);
    }
};

/**
 * Route DELETE /validations/:id
 * Supprime une validation par son identifiant.
 *
 * @param {string} req.params.id - ID de la validation à supprimer.
 * @returns {204} - Pas de contenu en cas de succès.
 * @throws 404 si validation non trouvée.
 * @throws Erreur transmise au middleware global en cas d’autres échecs.
 */
exports.deleteValidation = async (req, res, next) => {
    try {
        await validationService.deleteValidation(req.params.id);
        res.status(204).send();
    } catch (err) {
        if (err.message === 'Validation non trouvée') {
            return res.status(404).json({ message: err.message });
        }
        next(err);
    }
};