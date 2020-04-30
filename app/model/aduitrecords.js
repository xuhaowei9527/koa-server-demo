const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const aduitrecordSchema = new Schema({
  __v: { type: Number, select: false },
  orgination: { type: String, select: true, required: true },
  name: { type: String, required: true },
  time: { type: String, select: true, required: true },
  pass: { type: String, select: true, required: true },
});

module.exports = model("Aduitrecord", aduitrecordSchema);
