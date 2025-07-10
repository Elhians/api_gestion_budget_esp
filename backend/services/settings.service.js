const { Settings } = require('../models');

exports.get = async () => {
    let settings = await Settings.findByPk(1);
    if (!settings) {
        settings = await Settings.create({ id: 1 });
    }
    return settings;
};

exports.update = async (data) => {
    const settings = await Settings.findByPk(1);
    if (!settings) return settings.create({ id: 1, ...data });
    if (data.id) delete data.id; 
    return await settings.update(data);
};