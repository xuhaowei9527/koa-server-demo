const Router = require("koa-router");
const router = new Router({ prefix: "/unitprimarys" });

const {
  find,
  create,
  update,
  del,
} = require("../controllers/configuration/unitprimarys");

router.get("/", find);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", del);

module.exports = router;
