const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const unitprimarySchema = new Schema({
  __v: { type: Number, select: false },
  uid: { type: String, select: true, required: true },
  label: { type: String, required: true }
});

module.exports = model("Unitprimary", unitprimarySchema);
