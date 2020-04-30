const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const othereventinfoSchema = new Schema({
  __v: { type: Number, select: false },
});

module.exports = model("Othereventinfo", othereventinfoSchema);
