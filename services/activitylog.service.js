const { ActivityLog, Utilisateur } = require('../models');

exports.create = async (data) => {
    return await ActivityLog.create(data);
};

exports.findAll = async () => {
    return await ActivityLog.findAll({
        include: { model: Utilisateur, as: 'utilisateur', attributes: ['id', 'nom', 'email'] },
        order: [['dateHeure', 'DESC']]
    });
};

exports.findById = async (id) => {
    return await ActivityLog.findByPk(id, {
        include: { model: Utilisateur, as: 'utilisateur', attributes: ['id', 'nom', 'email'] }
    });
};

exports.update = async (id, data) => {
    const log = await ActivityLog.findByPk(id);
    if (!log) throw new Error("Log introuvable");
    return await log.update(data);
};

exports.remove = async (id) => {
    const log = await ActivityLog.findByPk(id);
    if (!log) throw new Error("Log introuvable");
    return await log.destroy();
};
exports.removeAll = async () => {
    return await ActivityLog.destroy({
        where: {},
        truncate: true
    });
}