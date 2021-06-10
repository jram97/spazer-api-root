const mongoose = require("mongoose");
const { Schema } = mongoose;

const VerifySchema = new Schema({
    code: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Verify", VerifySchema);