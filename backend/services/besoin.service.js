const { Besoin } = require('../models');

exports.createBesoin = async (data) => {

    console.log('DONNE DE CERATION: ',data);
    console.log('COUT  : ',data.cout);
    console.log('TITRE : ',data.titre);
    if (!data.titre || !data.cout) {
        throw new Error("Le titre et le coût sont requis.");
    }
    data.statut = data.statut || 'Soumis';
    return await Besoin.create(data);
};

exports.getAllBesoins = async () => {
    return await Besoin.findAll();
};

exports.getBesoinById = async (id) => {
    const besoin = await Besoin.findByPk(id);
    if (!besoin) throw new Error("Besoin non trouvé.");
    return besoin;
};

exports.deleteBesoin = async (id) => {
    const besoin = await Besoin.findByPk(id);
    if (!besoin) throw new Error("Besoin non trouvé.");
    await besoin.destroy();
    return { message: "Besoin supprimé avec succès." };
};


exports.updateBesoin = async (id, data) => {
    // Vérifier que le besoin existe
    console.log('identifiant du besoin a MAJ: ',data);
    // console.log('identifiant du besoin a MAJ: ',id);
    const besoin = await Besoin.findByPk(id);
    if (!besoin) {
        throw new Error("Besoin non trouvé.");
    }
    // Liste des champs autorisés à être mis à jour
    const updatableFields = ['titre', 'description', 'categorie', 'cout', 'statut', 'idAuteur'];
    
    // Filtrer les données pour ne garder que les champs autorisés
    const filteredData = {};
    for (const field of updatableFields) {
        if (data[field] !== undefined) {
            filteredData[field] = data[field];
        }
    }
    console.log('LA C BON ',filteredData);

    // Vérifier qu'il y a bien des données à mettre à jour
    if (Object.keys(filteredData).length === 0) {
        throw new Error("Aucune donnée valide fournie pour la mise à jour.");
    }else{ 
        // console.log('LA C BON ',filteredData);
    }

    // Mettre à jour le besoin
    await besoin.update(filteredData);
    // console.log('LA C BON ',filteredData);
    
    // Retourner le besoin mis à jour
    return await Besoin.findByPk(id);
};