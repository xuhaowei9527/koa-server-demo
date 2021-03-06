const Router = require("koa-router");
const router = new Router({ prefix: "/eventlevels" });

const {
  find,
  create,
  update,
  del,
} = require("../controllers/configuration/eventlevels");

router.get("/", find);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", del);

module.exports = router;
