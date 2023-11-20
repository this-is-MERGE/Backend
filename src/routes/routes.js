/* .routes/index.js */

const express = require("express");
const user = require("../controller/UserController");
const patient = require("../controller/PatientController")
const router = express.Router();

//로그인 창
router.get("/", user.already_login,user.startpage);
router.get("/signin",user.already_login, user.signin);
router.post("/signin",user.already_login, user.post_login);
//회원가입 창
router.get("/signup",user.already_login,user.signup);
router.post("/signup",user.already_login,user.post_user);
//환자 전체 조회 창
router.get("/patient",user.session_check,patient.search_all_patient);
//환자 검색
router.post("/patient",user.session_check,patient.patient_page);
//환자 추가
router.get("/logout",user.session_check, user.logout);
module.exports = router;