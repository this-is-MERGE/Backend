
const Patient = require("../model/Patient");

exports.search_patient = (req,res) => {
    if (Object.keys(req.query).length === 0) {
        Patient.search_all_patient(function (result) {
            return res.json({result: result});
        })
    } else {
        const Search_Option = Object.keys(req.query);
        const Search_Keyword = Object.values(req.query);
        Patient.search_patient(Search_Option, Search_Keyword, function (result) {
            if (result.length === 0) {
                console.log("환자 검색 없음");
                return res.json({result: result , Authorization : true});
            }
            else{
                return res.json({result: result,Authorization : true});
            }
        })
    }
}

exports.delete_patient = (req,res) =>{
    console.log(req.params.PATIENT_ID)
    Patient.delete_patient(req.params.PATIENT_ID, function (result){
        if(result.error != null){
            console.log(result);
            return res.json({flag : false, Authorization : true});
        }
        else{
            console.log("환자 삭제 성공");
            return res.redirect("/patient");
        }
        //삭제후  /patient redirect
    })
}

exports.modify_patient = (req,res) =>{
    Patient.modify_patient(req.params.PATIENT_ID,req.body.GENDER, req.body.AGE,req.body.ADDRESS,req.body.PHONE_NUMBER,req.body.RESIDENT_REGISTRATION_NUMBER
        ,req.body.SPECIAL_NOTE,req.body.PATIENT_NAME,req.body.USER_NAME, req.body.DEPARTMENT,function (result) {
            if(result.error != null) {
                console.log("환자 수정 실패");
                return res.json({flag: false,Authorization : true});
            }
            else {
                console.log(result);
                console.log("환자 수정 성공");
                //수정후 /patient redirect
                return res.redirect("/patient");
            }
        })
}
//환자 데이터 검색 후 특정값 콜백 // 정렬 아직 안됨
exports.add_patient = (req,res) =>{
    //환자의 성별, 나이, 주소, 휴대폰번호, 주민등록번호, 특이사항, 이름를 입력받는다.
    Patient.add_patient(req.body.GENDER, req.body.AGE, req.body.ADDRESS, req.body.PHONE_NUMBER, req.body.RESIDENT_REGISTRATION_NUMBER
        , req.body.SPECIAL_NOTE, req.body.PATIENT_NAME, req.body.USER_NAME, req.body.DEPARTMENT, function (result) {
        console.log(result);
        console.log("환자 추가 성공");
        //추가후 변경된 모든 환자 데이터 "/patient"로 redirect
            return res.redirect("/patient");
    })
}