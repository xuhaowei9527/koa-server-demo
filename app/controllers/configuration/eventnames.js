// 拿到事件名称模型
const Eventname = require("../../model/configuration/eventnames");

class EventnamesCtl {
  async find(ctx) {
    const data = await Eventname.find();
    ctx.body = {
      data: data,
      status: 200
    }
  }
  async create(ctx) {
    const eventname = await new Eventname(ctx.request.body).save();
    ctx.body = eventname;
  }
  async update(ctx) {
    const eventname = await Eventname.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = eventname;
  }
  async del(ctx) {
    const eventname = await Eventname.findByIdAndRemove(ctx.params.id);
    if (!eventname) {
      ctx.throw(404, "事件名称不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new EventnamesCtl();
