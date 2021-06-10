const Services = require("./../services");

class CompanyController {
    constructor() { }

    create(req, res, next) {
        Services.company.create(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            })
    }

    getAll(req, res, next) {
        Services.company.getAll(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            })
    }

    deactivate(req, res, next) {
        Services.company.deactivate(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    getById(req, res, next) {
        Services.company.getById(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    update(req, res, next) {
        Services.company.update(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    addBranchOffice(req, res, next) {
        Services.company.addBranchOffice(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }
}

module.exports = new CompanyController();