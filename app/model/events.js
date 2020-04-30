/**
 * 分别建文档存储事件信息
*/
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const schemaConf = {
  __v: { type: Number, select: false },
  occtime: { type: Number, select: true, required: true },
  discoverytime: { type: Number, required: true },
  eventtype: { type: String, select: true, required: true },
  eventname: { type: String, select: true, required: true },
  eventsource: { type: String, select: true, required: true },
  eventlevel: { type: String, select: true, required: true },
  eventremark: { type: String, select: true, required: true },
  unit: { type: String, select: true, required: true },
  tag: { type: Boolean, select: false, required: true },
  istop: { type: Boolean, select: false, required: false },
  toptime: { type: Number, select: false, required: false },
  isrejected: { type: Boolean, select: true, required: false },
  rejectreason: { type: String, select: true, required: false },
  eventinfo: {
    type: Schema.Types.ObjectId, 
    select: true, 
    required: true,
    refPath: 'reflist'
  },
  reflist: {
    type: String,
    required: false,
    enum: ['Trafficincidentinfos', 'Heavytrafficinfos', 'Naturaldisasterinfos', 'Siteeventinfos', 'Trafficcontrolinfos', 'Othereventinfos']
  },
  aduitrecord: {
    type: [{
      orgination: { type: String, select: true, required: true },
      name: { type: String, select: true, required: true },
      time: { type: Number, select: true, required: true },
      pass: { type: String, select: true, required: true },
    }],
    select: true
  },
  filelist: {
    type: [{
      url: { type: String, select: true, required: true }
    }]
  }
}
const Event = new Schema(schemaConf)

module.exports = model("Event", Event);
  