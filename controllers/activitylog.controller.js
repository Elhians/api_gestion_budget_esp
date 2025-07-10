const service = require('../services/activitylog.service');

exports.create = async (req, res) => {
    console.log('ca arrive ici 1');
    console.log('les donnees',req);
    try {
        const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const data = { ...req.body, adresse_ip: ip, id_utilisateur: req.body.idUtilisateur };
        console.log('les data',data);
        console.log('ca arrive ici 2');
        const log = await service.create(data);
        res.status(201).json(log);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.findAll = async (req, res) => {
    // console.log('la c bon activity');
    const logs = await service.findAll();
    res.json(logs);
};

exports.findById = async (req, res) => {
    const log = await service.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Log non trouvé" });
    res.json(log);
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