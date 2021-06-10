const mongoose = require("mongoose");
const { Schema } = mongoose;

const SlotSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  schedules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: false,
  }],
  features: [],
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
  pictures: [{
    type: String,
  }],
}, { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Slot", SlotSchema);
