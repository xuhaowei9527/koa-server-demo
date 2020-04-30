const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const unitsecondarySchema = new Schema({
  __v: { type: Number, select: false },
  upperid: { type: Schema.Types.ObjectId, ref: "Unitprimary", select: true, required: true },
  uid: { type: String, select: true, required: true },
  label: { type: String, required: true }
});

module.exports = model("Unitsecondary", unitsecondarySchema);
