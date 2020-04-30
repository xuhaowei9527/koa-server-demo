// 拿到用户模型
const Trafficincidentinfo = require("../model/trafficincidentinfos");

class TrafficincidentinfosCtl {
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1; // 页码
    const perPage = Math.max(per_page * 1, 1); // 页尺寸
    ctx.body = await Trafficincidentinfo.find({ name: new RegExp(ctx.query.q) })
      .limit(perPage)
      .skip(perPage * page);
  }
  async findById(ctx) {
    const trafficincidentinfo = await Trafficincidentinfo.findById(ctx.params.id);
      
    if (!trafficincidentinfo) {
      ctx.throw(404, "事件详情不存在");
    }
    ctx.body = trafficincidentinfo;
  }
  async create(ctx) {
    // ctx.verifyParams({
    //   name: { type: "string", required: true },
    //   password: { type: "string", required: true }
    // });
    const trafficincidentinfo = await new Trafficincidentinfo(ctx.request.body).save();
    ctx.body = trafficincidentinfo;
  }
  async update(ctx) {
    // ctx.verifyParams({
    //   name: { type: "string", required: false },
    //   password: { type: "string", required: false },
    //   avatar_url: { type: "string", required: false },
    //   gender: { type: "string", required: false },
    //   headline: { type: "string", required: false },
    //   locations: { type: "array", itemType: "string", required: false },
    //   business: { type: "string", required: false },
    //   employments: { type: "array", itemType: "object", required: false },
    //   educations: { type: "array", itemType: "object", required: false }
    // });
    const trafficincidentinfo = await Trafficincidentinfo.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!trafficincidentinfo) {
      ctx.throw(404, "事件信息不存在");
    }
    ctx.body = trafficincidentinfo;
  }
  async del(ctx) {
    const trafficincidentinfo = await Trafficincidentinfo.findByIdAndRemove(ctx.params.id);
    if (!trafficincidentinfo) {
      ctx.throw(404, "事件信息不存在");
    }
    ctx.status = 204;
  }
  
  // 检查用户存在与否中间件
  async checkTrafficincidentinfoExist(ctx, next) {
    const trafficincidentinfo = Trafficincidentinfo.findById(ctx.params.id);
    if (!trafficincidentinfo) {
      ctx.throw(404, "事件信息不存在");
    }
    await next();
  }
}

module.exports = new TrafficincidentinfosCtl();
