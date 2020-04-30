// 拿到事件类型模型
const Eventype = require("../../model/configuration/eventtypes");

class EventtypesCtl {
  async find(ctx) {
    const data = await Eventype.find();
    ctx.body = {
      data: data,
      status: 200
    }
  }
  async create(ctx) {
    const eventtype = await new Eventype(ctx.request.body).save();
    ctx.body = eventtype;
  }
  async update(ctx) {
    const eventtype = await Eventype.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = eventtype;
  }
  async del(ctx) {
    const eventtype = await Eventype.findByIdAndRemove(ctx.params.id);
    if (!eventtype) {
      ctx.throw(404, "事件类型不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new EventtypesCtl();
