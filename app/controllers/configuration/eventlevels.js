// 拿到事件名称模型
const Eventlevel = require("../../model/configuration/eventlevels");

class EventlevelsCtl {
  async find(ctx) {
    const data = await Eventlevel.find();
    ctx.body = {
      data: data,
      status: 200
    }

  }
  async create(ctx) {
    const eventlevel = await new Eventlevel(ctx.request.body).save();
    ctx.body = eventlevel;
  }
  async update(ctx) {
    const eventlevel = await Eventlevel.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = eventlevel;
  }
  async del(ctx) {
    const eventlevel = await Eventlevel.findByIdAndRemove(ctx.params.id);
    if (!eventlevel) {
      ctx.throw(404, "事件等级不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new EventlevelsCtl();
