const Services = require("./../services");

class BookingController {
    constructor() { }

    create(req, res, next) {
        Services.booking.create(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    concretar(req, res, next) {
        Services.booking.concretar(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    async getAvailableSlot(req, res, next) {
        const slot = await Services.booking.getAvailableSlot(req.body)

        if (slot) {
            res.status(200).json({
                msg: "Se encontro un slot",
                slot
            });
        } else {
            res.status(200).json({ msg: "No exite disponiblidad con los parametros seleccionados" });
        }
    }

    getAll(req, res, next) {
        Services.booking.getAll(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    getAllByMonth(req, res, next) {
        Services.booking.getAllByMonth(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    getById(req, res, next) {
        Services.booking.getById(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }
    getAllByBranchOfficeId(req, res, next) {
        Services.booking.getAllByBranchOfficeId(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    getAllByUserId(req, res, next) {
        Services.booking.getAllByUserId(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    getByUserIdHistory(req, res, next) {
        Services.booking.getByUserIdHistory(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    getByUserIdPending(req, res, next) {
        Services.booking.getByUserIdPending(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    getByBranchOfficeHistory(req, res, next) {
        Services.booking.getByBranchOfficeHistory(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

    getByBranchOfficePending(req, res, next) {
        Services.booking.getByBranchOfficePending(req.params)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(300).json(error);
            })
    }

}

module.exports = new BookingController();