const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Utilisateur } = require('../models');

exports.login = async ({ email, motDePasse }) => {
    const utilisateur = await Utilisateur.findOne({ where: { email } });
    if (!utilisateur) throw { status: 404, message: "Utilisateur introuvable" };

    const valid = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!valid) throw { status: 401, message: "Mot de passe incorrect" };

    const token = jwt.sign({ id: utilisateur.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || '2h' });

    return {
        message: "Connexion réussie",
        token,
        utilisateur: {
            id: utilisateur.id,
            prenom: utilisateur.prenom,
            nom: utilisateur.nom,
            email: utilisateur.email,
            role: utilisateur.role,
            idDepartementAppartenance: utilisateur.idDepartementAppartenance,
            idDepartementDirection: utilisateur.idDepartementDirection,
        }
    };
};

exports.definirMotDePasse = async ({ token, motDePasse }) => {
    if (!token || !motDePasse) throw { status: 400, message: "Token et mot de passe requis" };

    const utilisateur = await Utilisateur.findOne({ where: { resetToken: token } });

    if (!utilisateur || new Date() > utilisateur.resetTokenExpiration) {
        throw { status: 400, message: "Token invalide ou expiré" };
    }

    const hash = await bcrypt.hash(motDePasse, 10);
    utilisateur.motDePasse = hash;
    utilisateur.resetToken = null;
    utilisateur.resetTokenExpiration = null;
    await utilisateur.save();

    return { message: "Mot de passe défini avec succès" };
};
