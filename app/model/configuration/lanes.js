const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const laneSchema = new Schema({
  __v: { type: Number, select: false },
  uid: { type: String, select: true, required: true },
  label: { type: String, select: true, required: true }
});

module.exports = model("Lane", laneSchema);
