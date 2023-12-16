/* .routes/index.js */

const express = require("express");
const user = require("../controller/UserController");
const patient = require("../controller/PatientController")
const physical_therapy = require("../controller/PhysicalTherayController")
const totalreport = require("../controller/TotalReportController")
const TestResultController = require('../controller/TestResultController');
const ChartController = require("../controller/ChartController");
const router = express.Router();

//로그인 창
router.post("/signin",user.post_login);
//회원가입 창
router.post("/signup",user.post_user);
router.get("/edit",user.session_check,user.get_user_info);
router.put("/edit",user.session_check,user.edit_user_info);
//환자 전체 조회 창
router.get("/patient",user.session_check,patient.search_patient);
router.delete("/patient/:PATIENT_ID", user.check_doctor_nurse,patient.delete_patient);
router.put("/patient/:PATIENT_ID",user.check_doctor_nurse,patient.modify_patient);
router.post("/patient",user.check_doctor_nurse,patient.add_patient);
//운동 치료 정보 수정창
router.get("/physicaltherapy",user.session_check,physical_therapy.physical_therapy_info);
router.post("/physicaltherapy",user.check_physical_therapist, physical_therapy.add_physical_therapy_info);
router.put("/physicaltherapy/:THERAPY_CODE",user.check_physical_therapist, physical_therapy.modify_physical_therapy_info);
router.delete("/physicaltherapy/:THERAPY_CODE",user.check_physical_therapist, physical_therapy.delete_physical_therapy_info);
//환자 운동치료 정보 창
router.get("/patient/physicaltherapy/:PATIENT_ID",user.session_check,physical_therapy.patient_therapy_info);
router.delete("/patient/physicaltherapy/:PATIENT_ID/:PHYSICAL_THERAPY_ID",user.check_physical_therapist,physical_therapy.delete_patient_therapy_info);
router.get("/patient/physicaltherapy/:PATIENT_ID/:PHYSICAL_THERAPY_ID",user.session_check,physical_therapy.patient_therapy_detail_info)
router.delete("/patient/physicaltherapy/:PATIENT_ID/:PHYSICAL_THERAPY_ID/:SET",user.check_physical_therapist,physical_therapy.delete_patient_therapy_detail_info);
router.post("/patient/physicaltherapy/:PATIENT_ID",user.check_physical_therapist,physical_therapy.add_patient_therapy_info);
//마스터 병원 내부 DB 창
router.get("/master/user",user.check_master,user.master_get_user_info);
router.put("/master/user/:USER_ID", user.check_master, user.master_edit_user_info);
router.delete("/master/user/:USER_ID",user.check_master, user.master_delete_user_info);
//마스터 사용자 등록 승인 창
router.get("/master/approval",user.check_master,user.master_get_user_approval_info);
router.post("/master/approval/:USER_ID",user.check_master,user.master_user_approve);
//종합리포트
router.get("/patient/totalreport/:PATIENT_ID",totalreport.get_Total_Report_Info);
router.post("/patient/totalreport/:PATIENT_ID",totalreport.add_Total_Report_Info);
router.delete("/patient/totalreport/:PATIENT_ID/:TOTAL_REPORT_ID",totalreport.delete_Total_Report_Info);
//로그아웃
router.get("/logout",user.session_check, user.logout);

// 환자 검사 내역
router.get('/examine-data/:userId', TestResultController.getExamineData);
router.post('/examine-result',TestResultController.addExamineResult);
router.post('/add-patient-test-result/:patientId', TestResultController.addPatientTestResult);


// 환자 차트
router.post("/chart/:chartId", user.session_check, ChartController.addPatientChart);
router.get("/chart/:chartId", user.session_check, ChartController.getPatientChart);
router.put("/chart/:chartId", user.session_check, ChartController.updatePatientChart);
router.delete("/chart/:chartId", user.session_check, ChartController.deletePatientChart);
router.post("/chart/:chartId", user.session_check, ChartController.addPatientChart);
router.get("/chart/:chartId", user.session_check, ChartController.getPatientChart);

module.exports = router;