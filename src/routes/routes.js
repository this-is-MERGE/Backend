/* .routes/index.js */

const express = require("express");
const user = require("../controller/UserController");
const router = express.Router();

//로그인 창
router.get("/",user.session_check, user.startpage);
router.get("/signin",user.session_check, user.signin);
router.post("/signin",user.session_check, user.post_login);
//회원가입 창
router.get("/signup",user.session_check,user.signup);
router.post("/signup",user.session_check,user.post_user);
//환자 전체 조회 창
router.get("/patient",user.session_check,user.search_all_patient);
//환자 검색
router.get("/logout",user.session_check,user.logout);
module.exports = router;