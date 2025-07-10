const jwt = require('jsonwebtoken');

/**
 * Middleware d’authentification JWT.
 * Vérifie la présence et la validité d’un token JWT dans le header Authorization.
 * Injecte les données décodées dans req.user.
 *
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @param {Function} next - Fonction middleware suivante.
 * @returns 401 si token manquant ou invalide.
 */
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token d\'authentification requis' });
    }

    const token = authHeader.split(' ')[1];
    // console.log('avant decodage : ',token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Contient id, role, etc.
        // console.log('apres decodage : ',req.user)
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
};
/**
 * Middleware pour vérifier si l'utilisateur est un chef de département.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @param {Function} next - Fonction middleware suivante.
 * @returns 403 si l'utilisateur n'est pas un chef de département.
 */
const isChef = (req, res, next) => {
    if (req.user.role != 'CHEF_DEPARTEMENT') return res.status(403).json({ message: "Accès réservé aux chefs" });
    next();
};

/**
 * Middleware pour vérifier si l'utilisateur est un directeur.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @param {Function} next - Fonction middleware suivante.
 * @returns 403 si l'utilisateur n'est pas un directeur.
 */
const isDirecteur = (req, res, next) => {
    if (req.user.role != 'DIRECTEUR') return res.status(403).json({ message: "Accès réservé au directeur" });
    next();
};

const canExpressNeed = (req, res, next) => {
    // console.log('corps :',req.body);
    // console.log(res);
    // console.log(next);
    // console.log('utilisateur : ',req.user);
    if (req.body.roleAuteur !== 'CHEF_DEPARTEMENT' && req.body.roleAuteur !== 'AGENT' && req.body.roleAuteur !== 'ENSEIGNANT') {
        return res.status(403).json({ message: "Accès réservé aux chefs, agents et enseignants" });
    }
    // if (req.user.role !== 'CHEF_DEPARTEMENT' && req.user.role !== 'AGENT' && req.user.role !== 'ENSEIGNANT') {
    //     return res.status(403).json({ message: "Accès réservé aux chefs, agents et enseignants" });
    // }
    next();
};


module.exports = {
    authenticate,
    isChef,
    isDirecteur,
    canExpressNeed  
};