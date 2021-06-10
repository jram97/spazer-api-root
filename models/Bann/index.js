const mongoose = require("mongoose");
const { Schema } = mongoose;

const BannSchema = new Schema({
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requiered: false
    },
    branchOffice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BranchOffice",
        requiered: false
    }
}, { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Bann", BannSchema);