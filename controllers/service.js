const Services = require("./../services");

class RoleController {
    constructor() { }

    create(req, res, next) {
        Services.service.create(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            })
    }

    getAll(req, res, next) {
        Services.service.getAll(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            })
    }

    getByBranchOfficeId(req, res, next) {
        Services.service.getByBranchOfficeId(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    update(req, res, next) {
        Services.service.update(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    /*changeState(req, res, next) {
        Services.feature.changeState(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    getById(req, res, next) {
        Services.feature.getById(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    delete(req, res, next) {
        Services.feature.delete(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }*/
}

module.exports = new RoleController(); 