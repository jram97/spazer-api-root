const Services = require("./../services");

class RequestController {
    constructor() { }

    create(req, res, next) {
        Services.request.create(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    getAll(req, res, next) {
        Services.request.getAll()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            })
    }

    changeState(req, res, next) {
        Services.request.changeState(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    getById(req, res, next) {
        Services.request.getById(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    update(req, res, next) {
        Services.request.update(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    acceptRequest(req, res, next) {
        Services.request.acceptRequest(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    delete(req, res, next) {
        Services.request.delete(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }
}

module.exports = new RequestController();