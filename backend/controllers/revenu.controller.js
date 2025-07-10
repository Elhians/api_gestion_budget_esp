const service = require('../services/revenu.service');

exports.create = async (req, res) => {
    try {
        const revenu = await service.create(req.body);
        res.status(201).json(revenu);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.findAll = async (req, res) => {
    // console.log('la c bon revenu');
    const revenus = await service.findAll();
    res.json(revenus);
};

exports.findById = async (req, res) => {
    const revenu = await service.findById(req.params.id);
    if (!revenu) return res.status(404).json({ message: "Revenu non trouvé" });
    res.json(revenu);
};

exports.update = async (req, res) => {
    try {
        const updated = await service.update(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await service.remove(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
exports.removeAll = async (req, res) => {
    try {
        await service.removeAll();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};