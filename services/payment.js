"user strict";

const Payment = require("../models/Payment");

class PaymentService {
    constructor() { }

    async createOne(payment) {
        try {
            console.log(payment);
            const newPayment = new Payment(payment);
            const created = await newPayment.save();
            if (!created) {
                return false;
            }

            return created;
        } catch (error) {
            throw error
        }
    }

}

module.exports = new PaymentService();