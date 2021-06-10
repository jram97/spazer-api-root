"use strict";

const Services = require("./../services");

class UserService {
    constructor() { }

    getByEmail(req, res, next) {
        Services.user.getByEmail(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    getById(req, res, next) {
        Services.user.getById(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    verifyEmail(req, res, next) {
        Services.user.isEmailAvailable(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    update(req, res, next) {
        Services.user.update(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    changeProfilePicture(req, res, next) {
        Services.user.changeProfilePicture(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    changeState(req, res, next) {
        Services.user.changeState(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    addBann(req, res, next) {
        Services.user.addBann(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    cleanBannHistory(req, res, next) {
        Services.user.cleanBannHistory(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    addFirebaseToken(req, res, next) {
        Services.user.addFirebaseToken(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    deleteFirebaseToken(req, res, next) {
        Services.user.deleteFirebaseToken(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

    notificar(req, res, next) {
        Services.user.notificar(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            });
    }

}

module.exports = new UserService();
