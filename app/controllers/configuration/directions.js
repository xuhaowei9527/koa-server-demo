// 拿到事件名称模型
const Direction = require("../../model/configuration/directions");

class DirectionsCtl {
  async find(ctx) {
    const data = await Direction.find();
    ctx.body = {
      data: data,
      status: 200
    }
  }
  async create(ctx) {
    const direction = await new Direction(ctx.request.body).save();
    ctx.body = direction;
  }
  async update(ctx) {
    const direction = await Direction.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = direction;
  }
  async del(ctx) {
    const direction = await Direction.findByIdAndRemove(ctx.params.id);
    if (!direction) {
      ctx.throw(404, "事件等级不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new DirectionsCtl();
