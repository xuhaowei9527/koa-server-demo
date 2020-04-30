// 拿到事件名称模型
const Eventroad = require("../../model/configuration/eventroads");

class EventroadsCtl {
  async find(ctx) {
    const data = await Eventroad.find();
    ctx.body = {
      data: data,
      status: 200
    }
  }
  async create(ctx) {
    const eventroad = await new Eventroad(ctx.request.body).save();
    ctx.body = eventroad;
  }
  async update(ctx) {
    const eventroad = await Eventroad.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = eventroad;
  }
  async del(ctx) {
    const eventroad = await Eventroad.findByIdAndRemove(ctx.params.id);
    if (!eventroad) {
      ctx.throw(404, "路段不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new EventroadsCtl();
