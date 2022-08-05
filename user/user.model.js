const mongoose = require("mongoose");
const schema = mongoose.Schema;
const EmployeeSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    contact: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    tickets: [
      {
        type: schema.Types.ObjectId,
        ref: "ticket",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", EmployeeSchema);
module.exports = User;
