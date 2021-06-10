"user strict";

const Slot = require("../models/Slot");
const BranchOffice = require("../models/BranchOffice");
const featureService = require("../services/feature");
const scheduleService = require("../services/schedule");

class SlotService {
    constructor() { }

    create(body) {

        return new Promise(async (resolve, reject) => {
            try {
                const slot = await this.createOne(body);

                if (slot) {
                    resolve({
                        msg: "Exito",
                        slot
                    });
                } else {
                    reject({
                        msg: "No se ha podido registrar el espacio",
                        slot
                    });
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    err
                });
            };
        });
    }

    async createOne(body) {

        try {
            console.log("Creando slot");
            const { name, schedules, isActive, pictures, features } = body;

            const newSlot = new Slot({
                name,
                isActive,
                pictures,
                features
            });

            const newSchedules = await scheduleService.createMany(schedules);
            console.log(newSchedules);

            if (newSchedules && newSchedules.length > 0) {
                newSlot.schedules = newSchedules.map(function (feature) {
                    return feature._id
                });
            }

            const slot = await newSlot.save();
            console.log("Slot creado");
            return slot;
        } catch (err) {
            console.log("Error", err);
        }
    }

    async createMany(slots) {

        try {
            var creados = [];
            var creado = {};
            var i;
            for (i = 0; i < slots.length; i++) {
                creado = await this.createOne(slots[i]);
                creados.push(creado);
            }

            return creados;
        } catch (err) {
            console.log("Error", err);
        }

    }

    deactivate(params) {

        return new Promise(async (resolve, reject) => {
            try {
                const slot = await Slot.findOne({ _id: params._id });

                if (slot) {
                    slot.isActive = !slot.isActive;
                }

                const newData = await slot.save();

                if (newData) {
                    resolve({
                        msg: "El espacio ha sido desactivado",
                        newData
                    });
                } else {
                    reject({
                        msg: "El espacio no ha podido desactivarse"
                    });
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    error
                });
            }

        });
    }

    getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const all = await Slot.find({}).populate('schedules').populate('features');

                if (all.length > 0) {
                    resolve({
                        msg: "Exito",
                        slots: all
                    });
                } else {
                    reject({
                        msg: "No se obtuvieron resultados",
                        all
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

    byBranchOffice(req) {
        return new Promise(async (resolve, reject) => {
            const branchOffice = await BranchOffice.findById(req.params.id).populate({ path: "slots", populate: { path: "schedules", model: "Schedule" } });
            if (branchOffice) {
                resolve({
                    msg: "Se han obtenido resultados",
                    slots: branchOffice.slots
                });
            } else {
                resolve({
                    msg: "No se han encontrado resultados",
                    slots: {}
                });
            }
        });
    }

    getById(params) {

        return new Promise(async (resolve, reject) => {
            try {
                const slot = await Slot.findById(params._id).populate('schedules').populate('features');

                if (slot) {
                    resolve({
                        msg: "Exito",
                        slot
                    });
                } else {
                    resolve({
                        msg: "No se han encontrado resultados",
                        slot: {}
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
            try {
                const slot = await Slot.findById(req.body.id);

                //const { name, schedules, isActive, pictures } = req.body;

                if (slot) {
                    /*slot.name = name;
                    slot.schedules = schedules;
                    slot.isActive = isActive;
                    slot.pictures = pictures;*/

                    const newSlot = await Slot.findByIdAndUpdate(req.body.id, { ...req.body });


                    if (newSlot) {
                        resolve({
                            msg: "El espacio ha sido modificado con exito",
                            newSlot
                        });
                    } else {
                        reject({
                            msg: "No se ha podido modificar el espacio",
                        });
                    }
                } else {
                    reject({
                        msg: "No existe ese registro",
                        slot: {}
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
}

module.exports = new SlotService();