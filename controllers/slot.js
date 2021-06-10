const Services = require("./../services");

class SlotController {
    constructor() { }

    create(req, res, next) {
        Services.slot.create(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            })
    }

    getAll(req, res, next) {
        Services.slot.getAll(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            })
    }

    deactivate(req, res, next) {
        Services.slot.deactivate(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    getById(req, res, next) {
        Services.slot.getById(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    getByBranchOffice(req, res, next) {
        Services.slot.byBranchOffice(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    update(req, res, next) {
        Services.slot.update(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }
}

module.exports = new SlotController();