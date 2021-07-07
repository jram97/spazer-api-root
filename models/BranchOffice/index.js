const mongoose = require("mongoose");
const { Schema } = mongoose;

const BranchOfficeSchema = new Schema({
    name: {
        type: String,
        requiered: true
    },
    address: {},
    slots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot",
        requiered: false
    }],
    images: [{
        type: String,
        requiered: false
    }],
    features: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feature',
        required: false,
    }],
    /*users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requiered: false
    }],*/
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requiered: false
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        requiered: false
    }],
    schedules: [],
    isActive: {
        type: Boolean,
        requiered: false,
        default: false
    },
    phone: {
        type: String,
        required: false,
        default: false,
    },
    typeServices: {
        type: String,
        required: false,
        default: false,
    },
}, { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("BranchOffice", BranchOfficeSchema);