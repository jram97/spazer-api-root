const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
  date: {
    type: Date,
    required: false,
  },
  startTime: {
    type: String,
    required: false,
  },
  endTime: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    default: 0,
  },
}, { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
