const mongoose = require("mongoose");
const { Schema } = mongoose;

const RequestSchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    companyOwner: {
        type: String,
        required: true,
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
    state: {
        type: String,
        required: true,
        default: "w"
    },
    branchOffice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BranchOffice',
        requiered: false,
    },
    toCompleteURL:{
        type: String
    }
}, { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Request", RequestSchema);