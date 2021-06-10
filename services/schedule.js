"user strict";

const Schedule = require("../models/Schedule");

class RequestService {
    constructor() { }

    create(body) {

        return new Promise(async (resolve, reject) => {
            try {
                const schedule = await this.createOne(body);

                if (schedule) {
                    resolve({
                        msg: "Exito",
                        schedule
                    });
                } else {
                    reject({
                        msg: "No se ha podido crear el horario",
                        schedule
                    });
                }

            } catch (err) {
                console.log(err);
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }
        });
    }

    async createOne(body) {
        try {
            const { date, startTime, endTime, price } = body;

            const newSchedule = new Schedule({ date, startTime, endTime, price });

            const schedule = await newSchedule.save()

            return schedule;
        } catch (err) {
            console.log("Error: ", arr);
            return {};
        }
    }

    async createMany(schedules) {

        try {
            var creados = [];
            var creado = {};
            var i;

            for (i = 0; i < schedules.length; i++) {
                creado = await this.createOne(schedules[i]);
                creados.push(creado);
                //console.log(creado);
            }

            return creados;
        } catch (err) {

        }

    }

    changeState(req) {

        return new Promise(async (resolve, reject) => {
            try {
                resolve({
                    msg: "Pendiente"
                });
            } catch (error) {
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
                const all = await Schedule.find({});
                if (all.length > 0) {
                    resolve({
                        msg: "Exito",
                        schedules: all
                    });
                } else {
                    reject({
                        msg: "No se obtuvieron resultados",
                        schedules: all
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

    getById(params) {

        return new Promise(async (resolve, reject) => {
            try {
                const schedule = await Schedule.findById({ _id: params._id });

                if (schedule) {
                    resolve({
                        msg: "Exito",
                        schedule
                    });
                } else {
                    reject({
                        msg: "No se obtuvieron resultados",
                        schedule
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
                const schedule = await Schedule.findById(req.body.id);

                if (schedule) {
                    /*const { date, startTime, endTime, price } = req.body;

                    schedule.date = date;
                    schedule.startTime = startTime;
                    schedule.endTime = endTime;
                    schedule.price = price;*/

                    const newData = await Schedule.findByIdAndUpdate(req.body.id, {...req.body});

                    if (newData) {
                        resolve({
                            msg: "Exito",
                            schedule: newData
                        });
                    } else {
                        reject({
                            msg: "No se ha podido modificar el registro",
                            schedule
                        });
                    }
                } else {
                    reject({
                        msg: "No existe esa solicitud"
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

    delete(params) {

        return new Promise(async (resolve, reject) => {
            try {
                const schedule = await Schedule.deleteOne({ _id: params._id });

                if (schedule) {
                    resolve({
                        msg: "El horario se ha eliminado con exito",
                        schedule
                    });
                } else {
                    reject({
                        msg: "No se ha podido borrar el horario"
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

module.exports = new RequestService();