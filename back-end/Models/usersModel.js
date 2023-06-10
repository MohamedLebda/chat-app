const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    _id: Number,
    userName: { type: String, unique: true, required: true },
    password: String,
    email: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

mongoose.model("users", schema);
