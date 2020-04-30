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
  eventinfo: {},
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
const incident = {
  type: {
    road: { type: String, select: true, required: true },
    mileage: { type: String, required: true },
    direction: { type: String, select: true, required: true },
    istunnel: { type: Boolean, select: true, required: true },
    lane: { type: Array, select: true, required: true },
    effectlevel: { type: String, select: true, required: true },
    casualties: {
      type: {
        dead: { type: Number, select: true, required: true },
        wounded: { type: Number, select: true, required: true }
      },
      select: true
    }
  }
};

const heavytraffic = {};

const site = {};

const other = {};

const control = {};

const natural = {};

schemaConf.eventinfo = incident;
const Tra = new Schema(schemaConf);

schemaConf.eventinfo = heavytraffic;
const Hea = new Schema(schemaConf);

schemaConf.eventinfo = site;
const Sit = new Schema(schemaConf);

schemaConf.eventinfo = other;
const Oth = new Schema(schemaConf);

schemaConf.eventinfo = control;
const Cot = new Schema(schemaConf);

schemaConf.eventinfo = natural;
const Nat = new Schema(schemaConf);

const Trafficincident = model("Trafficincident", Tra);
const Heavytraffic = model("Heavytraffic", Hea);
const Site = model("Site", Sit);
const Other = model("Other", Oth);
const Control = model("Control", Cot);
const Natural = model("Natural", Nat);

module.exports = [Trafficincident, Heavytraffic, Natural, Site, Control, Other];
  