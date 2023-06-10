const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: String,
  seq: Number,
});

mongoose.model("counter", schema);
