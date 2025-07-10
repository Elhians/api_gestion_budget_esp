const service = require('../services/settings.service');

exports.get = async (req, res) => {
    // console.log('la c bon settings');
    try {
        const settings = await service.get();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await service.update(req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};