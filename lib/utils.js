const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require("../keys");
const limit = require("express-rate-limit");
const moment = require("moment");
const util = {};

util.auth = (req, res, next) => {
    //console.log(req.headers);
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, key.llave, (err, decoded) => {
            if (err) {
                return res.json({
                    mensaje: 'El token ingresado, es invalido',
                    status: false
                });
            } else {
                //console.log(decoded);
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'El token a expirado.',
            status: false
        });
    }
};


//Este metodo compara si number se en encuentra entre limitOne y limitTwo
util.isBetween = (number, limitOne, limitTwo) => {
    if ((number > limitOne && number < limitTwo)) {
        return true;
    }

    return false;
}

util.minutesToHours = (minutes) => {

    var hours = Math.floor(minutes / 60);

    var minute = minutes - (hours * 60);
    if (hours < 10) {
        hours = `0${hours}`
    }

    if (minute < 10) {
        minute = `0${minute}`
    }
    return `${hours}:${minute}`
}

util.getMinutes = (hour) => {

    return ((parseInt(hour.split(":")[0]) * 60) + parseInt(hour.split(":")[1]));
}

//Este metodo sirve para ver si las horas dos reservas chocan entre si, 
util.compareSchedule = (startTime, duration, reserve) => {
    let endTime = util.minutesToHours((parseInt(duration) + util.getMinutes(startTime)));
    const newEndTime = reserve.endTime;


    /*if (endTime < startTime) {
        endTime += 24;
    }

    if (reserve.endTime < reserve.startTime) {
        newEndTime += 24;
    }*/

    if (util.getMinutes(endTime) == util.getMinutes(newEndTime) && util.getMinutes(startTime) == util.getMinutes(reserve.startTime)) {
        return false;
    }

    if (util.isBetween(util.getMinutes(startTime), util.getMinutes(reserve.startTime), util.getMinutes(newEndTime)) || util.isBetween(util.getMinutes(endTime), util.getMinutes(reserve.startTime), util.getMinutes(newEndTime))) {
        return false;
    } else {
        if (util.isBetween(util.getMinutes(reserve.startTime), util.getMinutes(startTime), util.getMinutes(endTime)) || util.isBetween(util.getMinutes(newEndTime), util.getMinutes(startTime), util.getMinutes(endTime))) {
            return false;
        }
    }


    return true;
}

util.pendingBookings = (citas) => {
    return citas.filter(cita => {
        var fechaCita = new Date(`${cita.date.getFullYear()}-${cita.date.getMonth() + 1}-${cita.date.getDate()}`);
        fechaCita.setDate(fechaCita.getDate() + 1);
        const now = moment();
        const mFechaCita = moment(fechaCita).hour(cita.endTime);

        if (now.isBefore(mFechaCita)) {
            console.log(`Now: ${now} Fecha cita: ${mFechaCita}`);
            return cita;
        }
    })
}

util.bookingsHistory = (citas) => {
    return citas.filter(cita => {
        var fechaCita = new Date(`${cita.date.getFullYear()}-${cita.date.getMonth() + 1}-${cita.date.getDate()}`);
        fechaCita.setDate(fechaCita.getDate() + 1);
        const now = moment();
        const mFechaCita = moment(fechaCita).hour(cita.endTime);

        if (now.isAfter(mFechaCita)) {
            console.log(`Now: ${now} Fecha cita: ${mFechaCita}`);
            return cita;
        }
    })
}

util.limitApi = limit({
    //windowMs: 720 * 60 * 1000,
    windowMs: 360 * 60 * 1000,
    max: 1,
    message: "Intenta de nuevo en 6 horas"
})

module.exports = util;