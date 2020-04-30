// 拿到事件名称模型
const Lane = require("../../model/configuration/lanes");

class LanesCtl {
  async find(ctx) {
    const data = await Lane.find();
    ctx.body = {
      data: data,
      status: 200
    }
  }
  async create(ctx) {
    const lane = await new Lane(ctx.request.body).save();
    ctx.body = lane;
  }
  async update(ctx) {
    const lane = await Lane.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = lane;
  }
  async del(ctx) {
    const lane = await Lane.findByIdAndRemove(ctx.params.id);
    if (!lane) {
      ctx.throw(404, "车道不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new LanesCtl();
