const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firebaseTokens: [],
  imei: {
    type: String,
    required: false,
    default: ""
  },
  //banns: [],
  role: {
    type: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profilePicture: {
    type: Object
  },
  points: {
    type: Number,
    default: 0
  },
  emailConfirmed: {
    type: Boolean,
    requiered: false,
    default: false
  },
  numberconfirmed: {
    type: Boolean,
    default: false
  },
  phoneNumber: {
    type: String,
    requiered: false
  }
}, { timestamps: { createdAt: true, updatedAt: true } }
);

UserSchema.methods.matchPassword = async (password, ePassword) => {

  return await bcrypt.compare(password, ePassword);
};

UserSchema.methods.encryptPassword = async (password) => {

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports = mongoose.model("User", UserSchema);