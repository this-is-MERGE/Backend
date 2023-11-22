
const Patient = require("../model/Patient");
exports.search_all_patient = (req,res) =>{
    Patient.search_all_patient(function (result){
        //render로 바꿀 예정
        return res.send({result: result});
    })
}
//환자 데이터 검색 후 특정값 콜백 // 정렬 아직 안됨
exports.patient_page = (req,res) =>{
    const action = req.body.button;
    switch (action) {
        case 'search_patient':
            //Search_Option 분류(항목,주민등록번호 등..) Search_Keyword 검색어(1, 01121,,,등)
            Patient.search_patient(req.body.Search_Option, req.body.Search_Keyword,function (result){
                if (result.length ===0) {
                    console.log("환자 검색 성공");
                    return res.redirect("/patient");
                }
            })
            break;
        case 'delete_patient':
            //NAME: 환자이름, RESIDENT_REGISTRATION_NUMBER: 환자 주민등록번호
            Patient.delete_patient(req.body.NAME,req.body.RESIDENT_REGISTRATION_NUMBER, function (result){
                console.log(result);
                //삭제후  /patient redirect
                console.log("환자 삭제 성공");
                return res.redirect("/patient");
            })
            break;
        case 'add_patient':
            //환자의 성별, 나이, 주소, 휴대폰번호, 주민등록번호, 특이사항, 이름를 입력받는다.
            Patient.add_patient(req.body.GENDER, req.body.AGE,req.body.ADDRESS,req.body.PHONE_NUMBER,req.body.RESIDENT_REGISTRATION_NUMBER
                ,req.body.SPECIAL_NOTE,req.body.NAME,req.body.USER_NAME, req.body.DEPARTMENT,function (result){
                    console.log(result);
                    console.log("환자 추가 성공");
                    //추가후 변경된 모든 환자 데이터 "/patient"로 redirect
                    return res.redirect("/patient");
                })
            break;
        case 'modified_patient':
            Patient.modified_patient(req.body.GENDER, req.body.AGE,req.body.ADDRESS,req.body.PHONE_NUMBER,req.body.RESIDENT_REGISTRATION_NUMBER
                ,req.body.SPECIAL_NOTE,req.body.NAME,req.body.USER_NAME, req.body.DEPARTMENT,function (result) {
                    console.log(result);
                    console.log("환자 수정 성공");
                    //추가후 변경된 모든 환자 데이터 반환
                    return res.redirect("/patient");
                })
            break;
    }
}