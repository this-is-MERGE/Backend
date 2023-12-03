const PhysicalTherapy = require("../model/PhysicalTherapy");

exports.add_physical_therapy_info = (req,res) =>{
    PhysicalTherapy.add_physical_therapy_info(req.body.THERAPY_NAME, req.body.THERAPY_TYPE,req.body.PERFORMANCE_UNIT1,
        req.body.PERFORMANCE_UNIT2,function(result){
        if(result == null){
            return res.json({result: result, flag: false});
        }
        else {
            console.log("운동 추가 성공");
            return res.redirect("/physicaltherapy");
        }
    })
}
exports.physical_therapy_info = (req,res) => {
        PhysicalTherapy.physical_therapy_info(function (result) {
            return res.json(result);
        })
}
exports.modify_physical_therapy_info = (req,res) =>{
    console.log(req.params);
    PhysicalTherapy.modify_physical_therapy_info(req.params.THERAPY_CODE,req.body.THERAPY_NAME,
        req.body.THERAPY_TYPE,req.body.PERFORMANCE_UNIT1,
        req.body.PERFORMANCE_UNIT2, function (result){
        if(result.error != null) {
            console.log("운동 치료 수정 실패");
            return res.json({flag: false});
        }
        else {
            console.log(result);
            console.log("운동치료 수정 성공");
            //수정후 /physicaltherapy 로 redirect
            return res.redirect("/physicaltherapy");
        }
    })
}

exports.delete_physical_therapy_info = (req,res) =>{
    PhysicalTherapy.delete_physical_therapy_info(req.params.THERAPY_CODE, function (result){
        if(result.error != null){
            console.log(result);
            return res.json({flag : false});
        }
        else{
            //삭제후  /physicaltherapy redirect
            console.log("운동치료 삭제 성공");
            return res.redirect("/physicaltherapy");
        }
    })
}

exports.patient_therapy_info = (req,res) =>{
    PhysicalTherapy.patient_therapy_info(req.params.PATIENT_ID, function (result){
        if(result === null){
            return res.json({result : result, flag: false});
        }
        return res.json({result : result, flag: true});
    })
}

exports.delete_patient_therapy_info = (req,res) =>{
    PhysicalTherapy.delete_physical_therapy_info(req.params.PHYSICAL_THERAPY_ID, function (){
        return res.redirect(`/patient/physicaltherapy/${req.params.PATIENT_ID}`);
    })
}

exports.patient_therapy_detail_info= (req,res) =>{
    PhysicalTherapy.patient_therapy_detail_info(req.params.PHYSICAL_THERAPY_ID, function (result){
        if(result === null){
            return res.json({result : result, flag: false});
        }
        return res.json({result : result, flag: true});
    })
}

exports.delete_patient_therapy_detail_info = (req,res) =>{
    PhysicalTherapy.delete_patient_therapy_detail_info(req.params.PHYSICAL_THERAPY_ID, req.params.SET, function (){
        PhysicalTherapy.patient_therapy_detail_info(req.params.PHYSICAL_THERAPY_ID, function (result){
            return res.json({result : result});
        })
    })
}

exports.add_patient_therapy_info = (req, res) => {
        let therapy = req.body[0];
        console.log(req.params.PATIENT_ID);
        PhysicalTherapy.add_patient_therapy_info(
            therapy.THERAPY_DATE,
            therapy.MEMO,
            therapy.THERAPY_CODE,
            req.params.PATIENT_ID,
            therapy.USER_ID,
            function (result){
                console.log(result.error);
                if(result.error){
                    console.log("에러발생",result.error);
                    return res.json({result: result});
                }
                else{
                    let PHYSICAL_THERAPY_ID = result.insertId;
                    for(let i = 1; i<req.body.length; i++){
                        therapy = req.body[i];
                        PhysicalTherapy.add_patient_therapy_detail_info(
                            PHYSICAL_THERAPY_ID,
                            therapy.THERAPY_CODE,
                            therapy.PERFORMANCE1,
                            therapy.PERFORMANCE2,
                            therapy.SET,
                            therapy.REPS,
                            therapy.RESULT,
                            function () {
                                // 콜백 함수 내에서 원하는 로직 추가
                                console.log("환자 세부 운동 치료 정보 추가 성공");
                                return res.redirect(`/patient/physicaltherapy/${req.params.PATIENT_ID}`)
                            }
                        );
                    }
                }
            })
}