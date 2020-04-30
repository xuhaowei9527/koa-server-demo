const Router = require("koa-router");
const router = new Router({ prefix: "/events/:eventId/trafficincidentinfo" });
const {
  find,
  findById,
  create,
  update,
  del,
  checkTrafficincidentinfoExist
} = require("../controllers/trafficincidentinfos");


router.get("/", find);
router.post("/", create);
router.get("/:id", checkTrafficincidentinfoExist, findById);
router.patch("/:id", checkTrafficincidentinfoExist, update);
router.delete("/:id", checkTrafficincidentinfoExist, del);

module.exports = router;
