const { Utilisateur } = require('../models');
const { sendResetPasswordEmail } = require('../utils/email');
const crypto = require('crypto');

exports.createUtilisateur = async (data) => {
    const exist = await Utilisateur.findOne({ where: { email: data.email } });
    if (exist) throw new Error("Email déjà utilisé");

    console.log('donnees de l utilisateur a creer ', data);

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 heures

    // Gestion spécifique pour les chefs de département
    const idDepartementDirection = data.role === 'CHEF_DEPARTEMENT' 
        ? data.idDepartementAppartenance 
        : data.idDepartementDirection || null;

    const utilisateur = await Utilisateur.create({
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        motDePasse: '',
        role: data.role,
        statut: data.statut,
        idDepartementAppartenance: data.idDepartementAppartenance || null,
        idDepartementDirection: idDepartementDirection,
        resetToken,
        resetTokenExpiration: expiration
    });

    await sendResetPasswordEmail(utilisateur.email, resetToken);

    return utilisateur;
};



exports.getAllUtilisateurs = async () => {
    return await Utilisateur.findAll();
};

exports.getUtilisateurById = async (id) => {
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) throw new Error("Utilisateur non trouvé.");
    return utilisateur;
};

exports.deleteUtilisateur = async (id) => {
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) throw new Error("Utilisateur non trouvé.");
    await utilisateur.destroy();
    return { message: "Utilisateur supprimé avec succès." };
};



exports.updateUtilisateur = async (id, data) => {
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) throw new Error("Utilisateur non trouvé.");

    // Liste des champs modifiables
    const updatableFields = [
        'prenom', 'nom', 'email', 'role', 'statut',
        'idDepartementAppartenance', 'idDepartementDirection'
    ];

    // Filtrer les données
    const updates = {};
    for (const field of updatableFields) {
        if (data[field] !== undefined) {
            updates[field] = data[field];
        }
    }

    // Vérifier si l'email existe déjà pour un autre utilisateur
    if (updates.email) {
        const existingUser = await Utilisateur.findOne({ where: { email: updates.email } });
        if (existingUser && existingUser.id !== parseInt(id)) {
            throw new Error("Email déjà utilisé par un autre utilisateur");
        }
    }

    await utilisateur.update(updates);
    return utilisateur;
};