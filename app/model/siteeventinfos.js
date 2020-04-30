const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const siteeventinfoSchema = new Schema({
  __v: { type: Number, select: false },
  road: { type: String, select: true, required: true },
  direction: { type: String, required: true },
  start: { type: String, select: true, required: true },
  end: { type: String, select: true, required: true },
  lane: { type: Array, select: true, required: true }
});

module.exports = model("Siteeventinfo", siteeventinfoSchema);
