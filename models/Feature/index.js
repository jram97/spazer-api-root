const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeatureSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    icon: {
        type: String
    },
    iconSource: {
        type: String
    },
    detail: [{
        type: String
    }],
}, { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Feature", FeatureSchema);