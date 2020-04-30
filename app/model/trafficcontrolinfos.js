const mongoose = require("mongoose");
const { Schema, model } = mongoose;
/**
 * 交通管制路段信息
*/
const trafficcontrolinfoSchema = new Schema({
  __v: { type: Number, select: false },
  road: {
    type: [{
      road: { type: String, select: true, required: true },
      start: { type: String, select: true, required: true },
      end: { type: String, select: true, required: true }
    }]
  }
});

module.exports = model("Trafficcontrolinfo", trafficcontrolinfoSchema);
