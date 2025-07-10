const { Departement, Utilisateur } = require('../models');

class DepartementService {
    /**
     * Crée un département.
     * @param {Object} data
     * @returns {Promise<Departement>}
     */
    async createDepartement(data) {
        return await Departement.create(data);
    }

    /**
     * Récupère tous les départements avec leurs utilisateurs.
     * @returns {Promise<Array<Departement>>}
     */
    async getAllDepartements() {
        return await Departement.findAll({
            include: [
                { model: Utilisateur, as: 'utilisateurs', attributes: ['id', 'prenom', 'nom', 'email', 'role'] }
            ],
            order: [['nom', 'ASC']]
        });
    }

    /**
     * Récupère un département par ID avec ses utilisateurs.
     * @param {number} id
     * @returns {Promise<Departement|null>}
     */
    async getDepartementById(id) {
        return await Departement.findByPk(id, {
            include: [
                { model: Utilisateur, as: 'utilisateurs', attributes: ['id', 'prenom', 'nom', 'email', 'role'] }
            ]
        });
    }

    /**
     * Met à jour un département.
     * @param {number} id
     * @param {Object} data
     * @returns {Promise<number>} Nombre de lignes affectées.
     */
    async updateDepartement(id, data) {
        const [updated] = await Departement.update(data, { where: { id } });
        return updated;
    }

    /**
     * Supprime un département.
     * @param {number} id
     * @returns {Promise<number>} Nombre de lignes supprimées.
     */
    async deleteDepartement(id) {
        const deleted = await Departement.destroy({ where: { id } });
        return deleted;
    }
}

module.exports = new DepartementService();