/* .routes/index.js */

const express = require("express");
const user = require("../controller/UserController");
const router = express.Router();

//로그인 창
router.get("/", user.startpage);
router.get("/signin", user.signin);
router.post("/signin", user.post_login);
//회원가입 창
router.get("/signup",user.signup);
router.post("/signup",user.post_user);
//환자 전체 조회 창
router.get("/patient",user.search_all_patient);
//환자 검색
router.post("/patient",user.patient_page);
router.get("/logout", user.logout);
module.exports = router;