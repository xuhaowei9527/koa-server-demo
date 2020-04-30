// 拿到事件名称模型
const Vehicleinvoled = require("../../model/configuration/vehicleinvoleds");

class VehicleinvoledsCtl {
  async find(ctx) {
    const data = await Vehicleinvoled.find();
    ctx.body = {
      data: data,
      status: 200
    }
  }
  async create(ctx) {
    const vehicleinvoled = await new Vehicleinvoled(ctx.request.body).save();
    ctx.body = vehicleinvoled;
  }
  async update(ctx) {
    const vehicleinvoled = await Vehicleinvoled.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = vehicleinvoled;
  }
  async del(ctx) {
    const vehicleinvoled = await Vehicleinvoled.findByIdAndRemove(ctx.params.id);
    if (!vehicleinvoled) {
      ctx.throw(404, "事件等级不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new VehicleinvoledsCtl();
