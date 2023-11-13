/* .routes/index.js */

const express = require("express");
const user = require("../controller/UserController");
const router = express.Router();


router.get("/", user.startpage);
router.get("/signin", user.signin);
router.post("/signin", user.post_login);

router.get("/signup",user.signup);
router.post("/signup",user.post_user);

router.get("/index",user.index);
router.post("/index",user.index);

router.get("/logout", user.logout);
module.exports = router;