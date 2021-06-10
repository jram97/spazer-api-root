const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    code: {
        type: String
    },
    branchOffice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BranchOffice',
        requiered: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requiered: false,
    },
    ifNoUser: {}
}, { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Payment", PaymentSchema);