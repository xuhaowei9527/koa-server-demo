const Koa = require("koa");
// 获取post请求参数
const KoaBody = require("koa-body");
// 处理静态资源
const KoaStatic = require("koa-static");
// 错误处理中间件
const error = require("koa-json-error");
// 参数校验
const parameter = require("koa-parameter");
// 连接mongodb数据库
const mongoose = require("mongoose");
// nodejs路径处理
const path = require("path");
const app = new Koa();
const routing = require("./routes/index");
const { connectStr } = require("./config");

mongoose.set('useFindAndModify', false);
mongoose.connect(
  connectStr,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("连接成功")
);

mongoose.connection.on("error", console.error);

app.use(KoaStatic(path.join(__dirname, "public")));
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest }
  })
);

app.use(
  KoaBody(
    { 
      multipart: true , 
      // formidable: {
      //   uploadDir: path.join(__dirname, "public/uploads"),
      //   keepExtensions: true // 保留扩展名
      // }
    }
  )
);
app.use(parameter(app));
routing(app);

app.listen(8080, () => console.log("程序运行在: 8080端口"));
