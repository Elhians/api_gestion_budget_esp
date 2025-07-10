const { Revenu, Departement } = require('../models');

exports.create = async (data) => {
    return await Revenu.create(data);
};

exports.findAll = async () => {
    return await Revenu.findAll({
        include: { model: Departement, as: 'departement', attributes: ['id', 'nom'] },
        order: [['dateCreation', 'DESC']]
    });
};

exports.findById = async (id) => {
    return await Revenu.findByPk(id, {
        include: { model: Departement, as: 'departement', attributes: ['id', 'nom'] }
    });
};

exports.update = async (id, data) => {
    const revenu = await Revenu.findByPk(id);
    if (!revenu) throw new Error("Revenu introuvable");
    return await revenu.update(data);
};

exports.remove = async (id) => {
    const revenu = await Revenu.findByPk(id);
    if (!revenu) throw new Error("Revenu introuvable");
    return await revenu.destroy();
};
exports.removeAll = async () => {
    return await Revenu.destroy({
        where: {},
        truncate: true
    });
};