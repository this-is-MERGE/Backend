
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
                    //결과값과 flag 리턴
                    return res.send({result: result, flag: false});
                }
                else {
                    console.log(result);
                    return res.send({result: result, flag: true});
                }
            })
            break;
        case 'delete_patient':
            //NAME: 환자이름, RESIDENT_REGISTARTION_NUMBER: 환자 주민등록번호
            Patient.delete_patient(req.body.NAME,req.body.RESIDENT_REGISTARTION_NUMBER, function (){
                //삭제후  result값 반환
                Patient.search_all_patient(function (result){
                    return res.send({result: result});
                })
            })
            break;
    }
}
