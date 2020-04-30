const Router = require("koa-router");
const router = new Router({ prefix: "/eventtypes" });

const {
  find,
  create,
  update,
  del,
} = require("../controllers/configuration/eventtypes");

router.get("/", find);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", del);

module.exports = router;
