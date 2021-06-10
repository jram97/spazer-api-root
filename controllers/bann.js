const Services = require("./../services");

class BannController {
    constructor() { }

    create(req, res, next) {
        Services.bann.create(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    getByUser(req, res, next) {
        Services.bann.getByUser(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    byBranchOffice(req, res, next) {
        Services.bann.byBranchOffice(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    delete(req, res, next) {
        Services.bann.delete(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }
}

module.exports = new BannController();