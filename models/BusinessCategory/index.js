const mongoose = require("mongoose");
const { Schema } = mongoose;

const BusinessCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  logo: {
    type: String,
    required: false,
  },
  features: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feature",
    requiered: false
  }],
  /*services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    requiered: false
  }]*/
}, { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("BusinessCategory", BusinessCategorySchema);
