const authService = require('../services/auth.service');

/**
 * Route POST /login
 * Authentifie un utilisateur avec email et mot de passe.
 * @param {Object} req.body - Contient les champs email et mot_de_passe.
 * @returns {Object} - Token JWT et informations utilisateur.
 * @throws 401 si identifiants invalides, 500 en cas d’erreur serveur.
 */
exports.login = async (req, res) => {
    try {
        console.log("ok ikjuhgfcx");
        const result = await authService.login(req.body);
        res.json(result);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message || 'Erreur serveur' });
    }
};

/**
 * Route POST /definir-mot-de-passe
 * Permet à un utilisateur de définir ou réinitialiser son mot de passe via un token.
 * @param {Object} req.body - Contient token de réinitialisation et nouveau mot de passe.
 * @returns {Object} - Confirmation de la modification.
 * @throws 400 ou 401 selon l’erreur, 500 en cas d’erreur serveur.
 */
exports.definirMotDePasse = async (req, res) => {
    try {
        const result = await authService.definirMotDePasse(req.body);
        res.json(result);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message || 'Erreur serveur' });
    }
};