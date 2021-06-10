"user strict";

const utils = require("../lib/utils");
const Booking = require("../models/Booking");
const BranchOffice = require("../models/BranchOffice");
const Slot = require("../models/Slot");
const BranchOfficeService = require("../services/branchOffice");
const PaymentService = require("../services/payment");
const { compareSchedule } = require("../lib/utils");
const Service = require("../models/Service");
const User = require("../models/User");

class BookingService {
    constructor() { }

    create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.createOne(body);
                //console.log(data);

                if (data.created) {
                    resolve({
                        msg: "Exito",
                        booking: data.booking,
                        status: true
                    })
                } else {
                    reject({
                        msg: "No se ha podido crear la reserva",
                        status: false
                    });
                }

            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    err,
                    status: false
                });
            }
        });
    }

    concretar(req) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(req.body);
                const booking = await Booking.findByIdAndUpdate(req.body.id, { status: req.body.status });
                if (req.body.status == "Pagado") {
                    await PaymentService.createOne(req.body.payment);
                }

                resolve({
                    msg: "La cita se ha concretado con exito",
                    booking: booking,
                    status: true
                })
            } catch (error) {
                reject({
                    msg: "Algo salio mal",
                    error,
                    status: false
                });
            }
        });
    }

    async createOne(body) {
        try {
            const { branchOffice, date, type, startTime, status, isActive, user, services, ifNoUser, userMail } = body;
            var newDuration = 0, newEndTime = 0, price = 0, populatedService, i;
            if (services) {
                for (i = 0; i < services.length; i++) {
                    populatedService = await Service.findById(services[i]);
                    newDuration += populatedService.duration;
                    price += populatedService.price;
                }
            }

            body.duration = newDuration;
            const availableSlot = await this.getAvailableSlot(body);

            if (!availableSlot) {
                return {
                    created: false
                };
            }

            var bookingData = {
                branchOffice,
                slot: availableSlot,
                startTime,
                status: (status || "Pendiente"),
                //endTime: endTime,
                //duration,
                date,
                user,
                isActive,
                type,
                services,
                ifNoUser,
            }

            if (userMail) {
                var userDB = await User.findOne({ email: body.userMail });
                bookingData.user = userDB._id;
            }

            var newBooking = new Booking(bookingData);

            if (services) {
                newBooking.totalPrice = price;
                newBooking.duration = newDuration;
                newBooking.endTime = utils.minutesToHours(newBooking.duration + utils.getMinutes(newBooking.startTime));
            }

            const booking = await newBooking.save();

            return {
                created: true,
                booking
            };
        } catch (error) {
            console.log(eror);
        }
    }

    async getAvailableSlot(body) {

        const activeSlots = await BranchOfficeService.getActiveSlots(body.branchOffice); //Obtengo los espacios activos de la sucursal

        let slotBookings, slot, i, j, canReturn;
        if (activeSlots.length > 0) {

            for (i = 0; i < activeSlots.length; i++) { //recorro los espacios obtenidos anteriormente
                canReturn = true;
                slot = activeSlots[i];

                slotBookings = await Booking.find({ isActive: true, slot: slot._id, date: body.date, $or: [{ status: "Pendiente" }, { status: "Pagado" }] }); //obtengo las reservas activas que tenga ese espacio
                console.log("slotBookings", slotBookings);
                if (slotBookings.length === 0) { //si no obtengo respuesta, significa que que esta completamente disponible, por lo tanto, devuelvo ese espacio

                    return slot
                } else { // si obtengo respuesta, significa que tiene reservas, por lo tanto hay que revisarlas

                    for (j = 0; j < slotBookings.length; j++) { //recorro las reservas

                        //Este metodo se encuentra en la clase utils, en la carpeta lib
                        if (!compareSchedule(body.startTime, body.duration, slotBookings[j])) { //comparo los parametros de la nueva reserva, con la reserva que tenga el

                            //iterador en ese momento, viendo que no choquen
                            canReturn = false; //si en alguna reserva choca con la nueva, significa que el espacio no esta disponible en ese momento, entonces no puedo retornarlo
                            break;
                        }
                    }
                }

                if (canReturn) {//no se retorna y termina el for, y si ninguna reserva choca con los parametros de la nueva, la variable quedo como true y se retorna ese espacio
                    return slot
                }
            }
        }

        return false;
    }

    getById(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const reserve = await Booking.findById(params._id).populate("services");

                if (reserve) {
                    resolve({
                        msg: "Encontrado con exito",
                        reserve
                    });
                } else {
                    reject({
                        msg: "No se han obtenido resultados",
                        reserve: {}
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

    getAllByUserId(params) {
        console.log("Imprimiento body", params._id);
        return new Promise(async (resolve, reject) => {
            try {
                const reserves = await Booking.find({ user: params._id }).populate('branchOffice').populate('slot').populate("services").sort({ date: -1 });

                if (reserves.length > 0) {
                    resolve({
                        msg: "Encontrado con exito",
                        reserves
                    });
                } else {
                    resolve({
                        msg: "No se han obtenido resultados",
                        reserves: []
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

    getAllByBranchOfficeId(params) {
        console.log("Imprimiento body", params._id);
        return new Promise(async (resolve, reject) => {
            try {
                const reserves = await Booking.find({ branchOffice: params._id }).populate('branchOffice').populate('slot').populate("services").sort({ date: -1 });

                if (reserves.length > 0) {
                    resolve({
                        msg: "Encontrado con exito",
                        reserves
                    });
                } else {
                    resolve({
                        msg: "No se han obtenido resultados",
                        reserves: []
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

    getByUserIdPending(params) {
        console.log("Imprimiento body", params._id);
        return new Promise(async (resolve, reject) => {
            try {
                var reserves = await Booking.find({ user: params._id }).populate('branchOffice').populate('slot').populate("services").sort({ date: -1 });
                reserves = utils.pendingBookings(reserves);
                console.log(reserves.length);

                if (reserves.length > 0) {
                    resolve({
                        msg: "Encontrado con exito",
                        reserves
                    });
                } else {
                    resolve({
                        msg: "No se han obtenido resultados",
                        reserves: []
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

    getByUserIdHistory(params) {
        console.log("Imprimiento body", params._id);
        return new Promise(async (resolve, reject) => {
            try {
                var reserves = await Booking.find({ user: params._id }).populate('branchOffice').populate('slot').populate("services").sort({ date: -1 });
                reserves = utils.bookingsHistory(reserves);

                if (reserves.length > 0) {
                    resolve({
                        msg: "Encontrado con exito",
                        reserves
                    });
                } else {
                    resolve({
                        msg: "No se han obtenido resultados",
                        reserves: []
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

    getByBranchOfficePending(params) {
        console.log("Imprimiento body", params._id);
        return new Promise(async (resolve, reject) => {
            try {
                var reserves = await Booking.find({ branchOffice: params._id }).populate('branchOffice').populate('slot').populate("services").sort({ date: -1 });
                reserves = utils.pendingBookings(reserves);

                if (reserves.length > 0) {
                    resolve({
                        msg: "Encontrado con exito",
                        reserves
                    });
                } else {
                    resolve({
                        msg: "No se han obtenido resultados",
                        reserves: []
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

    getByBranchOfficeHistory(params) {
        console.log("Imprimiento body", params._id);
        return new Promise(async (resolve, reject) => {
            try {
                var reserves = await Booking.find({ branchOffice: params._id }).populate('branchOffice').populate('slot').populate("services").sort({ date: -1 });
                reserves = utils.bookingsHistory(reserves);

                if (reserves.length > 0) {
                    resolve({
                        msg: "Encontrado con exito",
                        reserves
                    });
                } else {
                    resolve({
                        msg: "No se han obtenido resultados",
                        reserves: []
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
                const reserves = await Booking.find({}).populate('branchOffice').populate('slot').populate("services");

                if (reserves.length > 0) {
                    resolve({
                        msg: "Encontrado con exito",
                        reserves
                    });
                } else {
                    reject({
                        msg: "No se han encontrado resultados",
                        reserves: []
                    })
                }
            } catch (err) {
                reject({
                    msg: "Algo salio mal",
                    err
                });
            }
        });
    }

    getAllByMonth(req) {
        return new Promise(async (resolve, reject) => {
            var date, byDate, bookings = [], day, month, i, diasConReservas = 0;
            const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            if (req.decoded.role) {
                day = i;
                month = parseInt(req.query.month) + 1;

                if (day < 10) {
                    day = `0${day}`
                }

                if (month < 10) {
                    month = `0${month}`
                }

                date = new Date(`${req.query.year}-${month}-01`);

                byDate = await Booking.find({
                    date: {
                        $lt: new Date(`${req.query.year}-${month}-31`),
                        $gt: new Date(`${req.query.year}-${month}-01`)
                    },
                    branchOffice: req.query.idSucursal,
                }).populate("user", "name profilePicture").populate("slot", "name features").populate("branchOffice", "name").populate("services").sort({ date: 1 });

                if (byDate.length > 0) {
                    date = new Date(`${req.query.year}-${month}-${byDate[0].date.getDate() + 1}`);
                    bookings.push({
                        start: date,
                        end: date,
                        times: [byDate[0]]
                    });

                    for (i = 1; i < byDate.length; i++) {
                        if (date.getTime() !== byDate[i].date.getTime()) {
                            diasConReservas++;
                            bookings.push({
                                start: byDate[i].date,
                                end: byDate[i].date,
                                times: []
                            });
                            date = new Date(`${req.query.year}-${month}-${byDate[i].date.getDate() + 1}`);
                        }

                        bookings[diasConReservas].times.push(byDate[i]);
                    }
                }

                resolve({
                    msg: "Encontrado con exito",
                    bookings
                });
            } else {
                reject({
                    msg: "No autorizado",
                });
            }
        });
    }
}

module.exports = new BookingService();