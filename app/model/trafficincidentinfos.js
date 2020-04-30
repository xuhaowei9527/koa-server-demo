const mongoose = require("mongoose");
const { Schema, model } = mongoose;
/**
 * road 路段
 * mileage 桩号
 * direction 方向
 * istunnel 是否隧道
 * lane 车道
 * effectlevel 影响等级
 * casualties 伤亡人数 dead 死亡 wounded 受伤
 * vehicleinvoled 涉事车辆类型
 * 
*/
const trafficincidentinfoSchema = new Schema({
  __v: { type: Number, select: false },
  road: { type: String, select: true, required: true },
  mileage: { type: String, required: true },
  direction: { type: String, select: true, required: true },
  istunnel: { type: Boolean, select: true, required: true },
  lane: { type: Array, select: true, required: true},
  effectlevel: { type: String, select: true, required: true },
  casualties: {
    type: {
      dead: { type: Number, select: true, required: true },
      wounded: { type: Number, select: true, required: true }
    }
  },
  vehicleinvoled: { type: Array, select: true, required: true },
});

module.exports = model("Trafficincidentinfo", trafficincidentinfoSchema);
