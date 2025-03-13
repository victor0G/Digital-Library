const authorization = require("../controller/authcontroller");

const Router = require("express").Router;

const router = Router();
router.post("/login", authorization.login);
router.post("/signup", authorization.signup);

module.exports = router;
