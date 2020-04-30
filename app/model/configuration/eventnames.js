const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventnameSchema = new Schema({
  __v: { type: Number, select: false },
  typeid: { type: Schema.Types.ObjectId, ref: "Eventtype", select: true, required: true},
  uid: { type: String, select: true, required: true },
  label: { type: String, select: true, required: true }
});

module.exports = model("Eventname", eventnameSchema);
