const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: Number
    }
}, { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Role", RoleSchema);