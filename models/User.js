const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  secondname: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  verified:{
    type:Boolean,
    default:false
  },
  verStr:{
    type:String,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "staff", "user"],
    default: "user",
  },
  staffTag: {
    type: String,
  },
  location: {
    type: String,
  },
  contact: {
    type: [String],
    match: [/^[0-9]{10}$/, "Incorrect contact enter."],
  },
  addresses: {
    type: [String],
  },
  cart:{
    type:[String],
  },
  transactions:{
    type:[String],
  }
});

module.exports = mongoose.model("User", UserSchema);
