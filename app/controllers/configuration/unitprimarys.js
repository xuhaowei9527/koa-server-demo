// 拿到事件类型模型
const Unitprimary = require("../../model/configuration/unitprimarys");

class UnitprimarysCtl {
  async find(ctx) {
    const data = await Unitprimary.find();
    ctx.body = {
      data: data,
      status: 200
    }
  }
  async create(ctx) {
    const eventtype = await new Unitprimary(ctx.request.body).save();
    ctx.body = eventtype;
  }
  async update(ctx) {
    const eventtype = await Unitprimary.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = eventtype;
  }
  async del(ctx) {
    const eventtype = await Unitprimary.findByIdAndRemove(ctx.params.id);
    if (!eventtype) {
      ctx.throw(404, "事件类型不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new UnitprimarysCtl();
