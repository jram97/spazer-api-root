"user strict";

const Service = require("../models/Service");
const BranchOffice = require("../models/BranchOffice");
const BusinessCategory = require("../models/BusinessCategory");

class RoleService {
    constructor() { }

    create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const newService = await this.createOne(body);

                if (!newService.err) {
                    resolve({
                        msg: "Creado con exito",
                        service: newService
                    });
                } else {
                    reject({
                        msg: "No se ha podido crear el servicio"
                    });
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }
        });
    }

    async createOne(service) {
        try {

            const { name, duration, price } = service
            const newService = new Service({
                name, duration, price
            });

            return await newService.save();
        } catch (err) {
            console.log(err);
            return {
                err
            }
        }
    }

    async createMany(services) {
        try {
            var creados = [];
            var creado = [];
            var i;

            for (i = 0; i < services.length; i++) {
                creado = await this.createOne(services[i]);
                creados.push(creado);
            }

            return creados;
        } catch (error) {
            console.log(error);
        }
    }

    getByBranchOfficeId(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const branchOffice = await BranchOffice.findById(req.params.id).populate("services");

                if (branchOffice) {
                    resolve({
                        msg: "Ejecutado con exito",
                        services: branchOffice.services
                    });
                } else {
                    reject({
                        msg: "No se encontro la sucursal",
                    });
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }
        });
    }

    getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const all = await Service.find({});

                if (all.length > 0) {
                    resolve({
                        msg: "Exito",
                        services: all
                    });
                } else {
                    reject({
                        msg: "No se obtuvieron resultados",
                        services: {}
                    });
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }
        });
    }

    update(req) {
        return new Promise(async (resolve, reject) => {
            const service = await Service.findById(req.body.id);

            if (service) {
                const oldService = await Service.findByIdAndUpdate(req.body.id, { ...req.body });
                resolve({
                    msg: "Exito",
                    service: oldService
                });
            } else {
                reject({
                    msg: "No existe ese servicio"
                });
            }
        });
    }
}

module.exports = new RoleService();