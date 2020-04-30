const fs = require('fs');
const path = require('path');
const moment = require("moment");
const cleardir = require("../utils/fs");
// JSON转换
const parseJson = function(str) {
  return JSON.parse(str);
}

// 获取当前时间字符串
const tstring = function () {
  return moment().format("YYYY-MM-DD hh:mm:ss");
}
const timestamp = function () {
  return moment().valueOf();
}
// 去除空白字符
const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
// 逐级创建文件夹,如果存在清空文件夹
const createDirsSync = function (dir, split, callback) {
  if (!fs.existsSync(dir)) {
    let dirArr = dir.split(split);
    let pathtmp = '/';
    
    dirArr.forEach((item) => {
      if (pathtmp) {
        pathtmp = path.join(pathtmp, item);
      }
      else {
        pathtmp = item;
      }
      if (!fs.existsSync(pathtmp)) {
        fs.mkdirSync(pathtmp);
      }
    }, function (err) {
      callback(err);
    })
  }
  else {
    cleardir(dir);
    callback(null);
  }
}
// 通过promise封装读写文件流
/**
 * ctx
 * arr 文件数组
 * ID 事件id，用来创建文件夹
 * t 当前时间戳
*/
function createPromise(ctx, arr, id, t) {
  // 创建图片媒体文件存储路径，根据mongodb自动生成的_id
  const p = path.join(__dirname, "../public/uploads/") + id;
  // 创建存储文件夹
  createDirsSync(p, "/", () => {
    console.log("创建完成文件夹");
  });
  const promiseall = arr.map((i)=> {
    return new Promise((resolve, reject) => {
      // 控制读写速率
      const mb = 1024 * 1024;
      // 创建可读流，文件路径、读写速度
      const readerStream = fs.createReadStream(i.path, {highWaterMark : mb * 10});
      // 创建可写流
      const writerStream = fs.createWriteStream(p + "/" + t + i.name);
      const url = `${ctx.origin}/uploads/${id}/${t + i.name}`;
      // 添加监听
      // 到目前为止写入的字节数
      // writeStream.bytesWritten
      // 监听文件读写完成事件
      writerStream.on('finish', (e) => {
        // console.log(writerStream.bytesWritten);
        // 写入完成后改变promise完成态
        resolve(url);
        // 结束写操作
        writerStream.end();
      });
      // 边读边写
      readerStream.pipe(writerStream);
    })
  })
  // 利用promise.all包装一些每个文件的promise操作
  return Promise.all([...promiseall]);
}

// 事件模型
const Event = require("../model/events");

const Trafficincidentinfo = require("../model/trafficincidentinfos")
const Heavytrafficinfo = require("../model/heavytrafficinfos");
const Naturaldisasterinfo = require("../model/naturaldisasterinfos");
const Siteeventinfo = require("../model/siteeventinfos");
const Trafficcontrolinfo = require("../model/trafficcontrolinfos");
const Othereventinfo = require("../model/othereventinfos");

const Eventarray = [Trafficincidentinfo, Heavytrafficinfo, Naturaldisasterinfo, Siteeventinfo, Trafficcontrolinfo, Othereventinfo];
const Eventarraystring = ['trafficincidentinfos', 'heavytrafficinfos', 'naturaldisasterinfos', 'siteeventinfos', 'trafficcontrolinfos', 'othereventinfos'];
class EventsCtl {
  // 普通分页查询,查询事件列表，eventinfo事件信息需要单独查询
  async find(ctx) {
    const { fields = "" } = ctx.query;
    // 查询隐藏字段、不加fields参数不返回
    const selectFields = fields
      .split(";")
      .filter(f => f)
      .map(f => " " + f)
      .join('');
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1; // 页码
    const perPage = Math.max(per_page * 1, 1); // 页尺寸
    const event = await Event.find()
      .select(selectFields).populate('eventinfo')
      .limit(perPage)
      .skip(perPage * page);
    const count = await Event.count();
    ctx.body = {
      data: event,
      total: count,
      status: 200
    };
  }

  // 查询事件详细信息
  async findDetail(ctx) {
    const { type, id } = ctx.query;
    const Earr = Eventarray[parseInt(type) - 1];
    const info = await Earr.findById(id);
    ctx.body = {
      data: info,
      status: 200
    };
  }

  //  根据条件查询
  async findByCon(ctx) {
    const { fields = "" } = ctx.query;
    // 查询隐藏字段、不加fields参数不返回
    const selectFields = fields
      .split(";")
      .filter(f => f)
      .map(f => " " + f)
      .join('');
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;; // 页码
    const perPage = Math.max(per_page * 1, 1); // 页尺寸
    const type = ctx.query.eventtype;
    // 事件类型检索
    const typestring = Eventarraystring[parseInt(ctx.query.eventtype) - 1];
    // 是否结束
    const isfinish = ctx.query.isfinish;
    // 管理部门
    const unit = ctx.query.unit;
    // 所在线路
    const road = ctx.query.road;
    // 开始时间
    const start = moment(ctx.query.start).valueOf();
    // 结束时间
    const end = moment(ctx.query.end).valueOf();
    const conditions = {
      $and: [
        // {$where: ()=> {print(this.occtime); return this.eventinfo !== null}}
      ]
    };

    // 事件类型
    type !== undefined ? conditions.$and.push({ eventtype: { $regex: type } }) : "";
    // 是否结束
    isfinish !== undefined ? conditions.$and.push({ tag: { $eq: isfinish } }) : "";
    // 管理部门
    unit !== undefined ? conditions.$and.push({ unit: { $regex: unit } }) : "";
    // 路段名称
    road !== undefined ? conditions.$and.push({
      info: {
        $elemMatch: { road: { $regex: road } }
      }
    }): '';
    // 时间段
    start !== undefined && end !== undefined ? conditions.$and.push({ occtime: { $gte: start, $lte: end } }) : "";
    // 根据查询事件中的详细信息匹配数据
    // const event = await Event.find(conditions)
    //   .select(selectFields)
    //   .populate({
    //     path: 'eventinfo',
    //     match: { road: { $regex: road } },
    //     select: 'road direction start end',
    //   })
    //   .$where(`this.occtime >= ${start} && this.occtime <= ${end}`)
    //   .limit(perPage)
    //   .skip(perPage * page);
    //   ctx.body = event;
    const lookupstr = {
      $lookup:
      {
        from: typestring,
        localField: "eventinfo",
        foreignField: "_id",
        as: "info"
      }
    };
    const aggconfig = [
      {
        $match: {
          ...conditions,
          // occtime: { $gte: start, $lte: end }
        }
      },
      // skip和limit顺序不能颠倒
      {
        $skip: perPage * page
      },
      {
        $limit: perPage
      },
    ]
    if(typestring) {
      aggconfig.unshift(lookupstr);
    }
    // 聚合查询
    const event = await Event.aggregate(aggconfig, function (err, docs) {
      if (err) {
       //  console.log(err);
        return;
      }
    });
    ctx.body = event;
  }

  // 模糊搜索
  async search(ctx) {
    const { fields = "" } = ctx.query;
    // 查询隐藏字段、不加fields参数不返回
    const selectFields = fields
      .split(";")
      .filter(f => f)
      .map(f => " " + f)
      .join('');
    const { per_page = 3 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1; // 页码
    const perPage = Math.max(per_page * 1, 1); // 页尺寸
    const keyword = ctx.query.keyword || '';
    const event = await Event.find({
      $or: [
        // 多字段同时匹配
        // 事件详细信息检索
        { eventremark: { $regex: keyword } },
        { rejectreason: { $regex: keyword } },
      ]
    }).select(selectFields).populate('eventinfo')
      .limit(perPage)
      .skip(perPage * page);
    ctx.body = event;
  }

  // 检查是否存在相同事件
  async checkEventExist(ctx, next) {
    const event = await Event.findById(ctx.params.id);
    if (!event) {
      ctx.throw(404, "事件不存在");
    }
    // 只有删改查事件才有此选项
    if (ctx.eventId && event.eventId !== ctx.params.eventId) {
      ctx.throw(404, "该问题下没有此答案");
    }
    // 挂载到ctx.state上，供update使用
    ctx.state.event = event;
    await next();
  }

  async findById(ctx) {
    const { fields = "" } = ctx.query;
    // 查询隐藏字段、不加fields参数不返回
    const selectFields = fields
      .split(";")
      .filter(f => f)
      .map(f => " " + f)
      .join('');
    // 查询事件信息
    const event = await Event.findById(ctx.params.id)
      .select(selectFields);
    const { type = '' } = ctx.query;
    const Earr = Eventarray[parseInt(type) - 1];
    const info = await Earr.findById(event.eventinfo);
    console.log(info);
    
    ctx.body = { event, info: info };
  }

  async create(ctx) {
    const { type = ''} = ctx.query;
    const Earr = Eventarray[parseInt(type) - 1];
    const data = ctx.request.body.data;
    const { 
      occtime,
      discoverytime,
      eventtype,
      eventname,
      eventsource,
      eventlevel,
      eventremark,
      unit,
      tag,
      istop,
      toptime,
      isrejected,
      rejectreason,
      eventinfo,
      aduitrecord
    } = parseJson(data);
    let files = [];
    Object.keys(ctx.request.files).forEach(i => {
      files.push(ctx.request.files[i])
    });
    // 存储eventinfo事件信息
    const T = await new Earr({
      ...eventinfo
    }).save();
    // 存文本数据
    const event = await new Event({
      occtime,
      discoverytime,
      eventtype,
      eventname,
      eventsource,
      eventlevel,
      eventremark,
      unit,
      tag,
      istop,
      toptime,
      isrejected,
      rejectreason,
      eventinfo: T._id,
      aduitrecord: [...aduitrecord]
    }).save();
    let url = [];
    // 存媒体数据
    const t = timestamp();
    await createPromise(ctx, files, event._id, t).then(e => {
      // 文件地址传入filelist
      url = e;
    }); 
    const filelistarr = url.map(i => {
      return {
        url: i
      }
    });
    const fin = await Event.findByIdAndUpdate(event._id, {
      filelist: filelistarr
    });
    fin.filelist = filelistarr;
    ctx.body = fin;


    // 本地存储文件第二种方式
    // const basename = path.basename(i.path);
    // ctx.body = { url: `${ctx.origin}/uploads/${basename}` }
    // });
  }
  async update(ctx) {
    // ctx.verifyParams({
    //   content: { type: "string", required: true },
    //   answerer: { type: "string", required: false },
    //   eventId: { type: "string", required: false }
    // });
    // 获取formdata数据
    const data = ctx.request.body.data;
    const { type = '' } = ctx.query;
    const Earr = Eventarray[parseInt(type) - 1]
    const id = ctx.params.id;
    const { 
      occtime,
      discoverytime,
      eventtype,
      eventname,
      eventsource,
      eventlevel,
      eventremark,
      unit,
      tag,
      istop,
      toptime,
      isrejected,
      rejectreason,
      eventinfo,
      aduitrecord
    } = parseJson(data);
    // 暂存文件
    let files = [];
    Object.keys(ctx.request.files).forEach((i) => {
      files.push(ctx.request.files[i]);
    });
    // 存放文件url
    let url = [];
    // 存媒体数据
    const t = timestamp();
    await createPromise(ctx, files, id, t).then((e) => {
      // 文件地址传入filelist
      url = e;
    });
    const filelistarr = url.map((i) => {
      return {
        url: i,
      };
    });
    // 更新事件信息
    const updateevent = await Event.findByIdAndUpdate(id, {
      occtime,
      discoverytime,
      eventtype,
      eventname,
      eventsource,
      eventlevel,
      eventremark,
      unit,
      tag,
      istop,
      toptime,
      isrejected,
      rejectreason,
      aduitrecord: [...aduitrecord],
      filelist: filelistarr,
    }).populate("eventinfo");
    // 更新车辆详细信息
    await Earr.findByIdAndUpdate(updateevent.eventinfo, {
      ...eventinfo,
    });
    // 查询最新车辆详细信息
    const after = await Earr.findById(updateevent.eventinfo);
    updateevent.eventinfo = after;
    ctx.body = updateevent;
  }
  async betop(ctx) {
    const id = ctx.params.id;
    const data = ctx.request.body;
    const event = await Event.findByIdAndUpdate(id, {
      istop: data.istop,
      toptime: new Date().getTime()
    });
    ctx.body = {
      data: event,
      status: 200
    };
  }

  // 删除
  async del(ctx) {
    const { type = '' } = ctx.query;
    const Earr = Eventarray[parseInt(type) - 1];
    // 删除事件
    const event = await Event.findByIdAndRemove(ctx.params.id);
    // 删除关联表信息
    await Earr.findByIdAndRemove(event.eventinfo);
    ctx.body = event;
  }
}

module.exports = new EventsCtl();
