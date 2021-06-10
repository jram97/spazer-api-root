"user strict";


const Bann = require("../models/Bann");

class BannService {
    constructor() { }

    create(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const newBann = new Bann({ ...req.body });

                if (newBann) {
                    newBann.save();
                    resolve({
                        msg: "Exito",
                        newBann
                    });
                } else {
                    resolve({
                        msg: "No se ha podido agregar la amonestacion"
                    });
                }
            } catch (error) {
                reject({
                    msg: "Algo salio mal",
                    err,
                    status: false
                });
            }
        });
    }

    getByUser(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const banns = await Bann.find({ user: req.params.id }).populate("user", "name email profilePicture");

                if (banns) {
                    resolve({
                        msg: "Exito",
                        banns
                    });
                } else {
                    reject({
                        msg: "No se encontraron resultados",
                        banns: []
                    });
                }
            } catch (error) {
                reject({
                    msg: "Algo salio mal",
                    err,
                    status: false
                });
            }
        });
    }

    byBranchOffice(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const banns = await Bann.find({ branchOffice: req.params.id }).populate("user", "name email profilePicture");

                if (banns) {
                    resolve({
                        msg: "Exito",
                        banns
                    });
                } else {
                    reject({
                        msg: "No se encontraron resultados",
                        banns: []
                    });
                }
            } catch (error) {
                reject({
                    msg: "Algo salio mal",
                    err,
                    status: false
                });
            }
        });
    }

    delete(req){
        return new Promise(async (resolve, reject) => {
            try {
                const bann = await Bann.findByIdAndDelete(req.params.id).populate("user", "name email profilePicture");

                if (bann) {
                    resolve({
                        msg: "Exito",
                        bann
                    });
                } else {
                    reject({
                        msg: "No se ha podido borrar la amonestacion",
                    });
                }
            } catch (error) {
                reject({
                    msg: "Algo salio mal",
                    err,
                    status: false
                });
            }
        });
    }

}

module.exports = new BannService();