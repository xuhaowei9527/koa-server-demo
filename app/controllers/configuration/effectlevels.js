// 拿到事件名称模型
const Effectlevel = require("../../model/configuration/effectlevels");

class EffectlevelsCtl {
  async find(ctx) {
    const data = await Effectlevel.find();
    ctx.body = {
      data: data,
      status: 200
    }
  }
  async create(ctx) {
    const effectlevel = await new Effectlevel(ctx.request.body).save();
    ctx.body = effectlevel;
  }
  async update(ctx) {
    const effectlevel = await Effectlevel.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = effectlevel;
  }
  async del(ctx) {
    const effectlevel = await Effectlevel.findByIdAndRemove(ctx.params.id);
    if (!effectlevel) {
      ctx.throw(404, "影响等级不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new EffectlevelsCtl();
