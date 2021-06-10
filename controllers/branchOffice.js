const Services = require("./../services");

class BranchOfficeController {
    constructor() { }

    create(req, res, next) {
        Services.branchOffice.create(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    probarImagenes(req, res, next) {
        Services.branchOffice.create(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    getAll(req, res, next) {
        Services.branchOffice.getAll(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    getById(req, res, next) {
        Services.branchOffice.getById(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    getByCategoryId(req, res, next) {
        Services.branchOffice.getByCategoryId(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    deactivate(req, res, next) {
        Services.branchOffice.deactivate(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    update(req, res, next) {
        Services.branchOffice.update(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    addUser(req, res, next) {
        Services.branchOffice.addUser(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    addSlot(req, res, next) {
        Services.branchOffice.addSlot(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }
}

module.exports = new BranchOfficeController();