const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number
    },
    price: {
        type: Number
    }
}, { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Service", ServiceSchema);