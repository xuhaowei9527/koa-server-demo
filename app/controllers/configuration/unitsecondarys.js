// 拿到事件类型模型
const Unitsecondary = require("../../model/configuration/unitsecondarys");

class UnitsecondarysCtl {
  async find(ctx) {
    const data = await Unitsecondary.aggregate([
      {
        $lookup: {
          from: 'unitprimaries',
          localField: "upperid",
          foreignField: "_id",
          as: "unitprimaries"
        }
      }
    ]);
    ctx.body = {
      data: data,
      status: 200
    }
  }
  async create(ctx) {
    const eventtype = await new Unitsecondary(ctx.request.body).save();
    ctx.body = eventtype;
  }
  async update(ctx) {
    const eventtype = await Unitsecondary.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = eventtype;
  }
  async del(ctx) {
    const eventtype = await Unitsecondary.findByIdAndRemove(ctx.params.id);
    if (!eventtype) {
      ctx.throw(404, "事件类型不存在");
    }
    ctx.status = 204;
  }
}

module.exports = new UnitsecondarysCtl();
