const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
    branchOffice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BranchOffice",
        requiered: false
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot",
        requiered: false
    },
    type: {
        type: Number
    },
    //schedule: {},
    startTime: {
        type: String
    },
    duration: {
        type: Number
    },
    endTime: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requiered: false
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: String
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        requiered: false
    }],
    ifNoUser: {}
}, { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Booking", BookingSchema);