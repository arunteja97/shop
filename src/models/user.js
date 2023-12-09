import mongoose, { Schema } from "mongoose";
import pkg from "validator";
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    validate: [pkg.isEmail, "invalid email"],
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  orders: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Order",
    },
  ],
});

export const User = mongoose.model("User", userSchema);
