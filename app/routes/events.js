const Router = require("koa-router");
const router = new Router({ prefix: "/events" });
// const jwt = require("koa-jwt");
const { secret } = require("../config");

const {
  find,
  findDetail,
  findByCon,
  findById,
  search,
  create,
  update,
  betop,
  del,
  checkEventExist
} = require("../controllers/events");

// 认证中间件
// const auth = jwt({ secret });
// 暂去auth
router.get("/", find);
router.get("/detail/", findDetail);
router.get("/condition/", findByCon);
router.get("/search/", search);
router.post("/", create);
router.get("/:id", checkEventExist, findById);
router.patch("/:id", checkEventExist, update);
router.patch("/settop/:id", checkEventExist, betop);
router.delete("/:id", checkEventExist, del);

module.exports = router;
