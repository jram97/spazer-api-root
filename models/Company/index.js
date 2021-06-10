const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requiered: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessCategory',
        requiered: false,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dui: {
        type: String,
    },
    nit: {
        type: String,
    },
    iva: {
        type: String,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    branchOffices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BranchOffice",
        requiered: false
    }]
}, { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Company", CompanySchema);