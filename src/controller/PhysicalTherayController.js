const PhysicalTherapy = require("../model/PhysicalTherapy");

exports.add_physical_therapy_info = (req,res) =>{
    PhysicalTherapy.add_physical_therapy_info(req.body.THERAPY_NAME, req.body.THERAPY_TYPE,req.body.PERFORMANCE_UNIT1,
        req.body.PERFORMANCE_UNIT2,function(result){
        if(result == null){
            return res.send({result: result, flag: false});
        }
        else {
            console.log("운동 추가 성공");
            return res.redirect("/physicaltherapy");
        }
    })
}
exports.physical_therapy_info = (req,res) => {
        PhysicalTherapy.physical_therapy_info(function (result) {
            //추후 render로 변경 예정
            return res.send({result: result});
        })
}
exports.modify_physical_therapy_info = (req,res) =>{
    console.log(req.params);
    PhysicalTherapy.modify_physical_therapy_info(req.params.THERAPY_CODE,req.body.THERAPY_NAME,
        req.body.THERAPY_TYPE,req.body.PERFORMANCE_UNIT1,
        req.body.PERFORMANCE_UNIT2, function (result){
        if(result.error != null) {
            console.log("운동 치료 수정 실패");
            return res.send({flag: false});
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
            return res.send({flag : false});
        }
        else{
            //삭제후  /physicaltherapy redirect
            console.log("운동치료 삭제 성공");
            return res.redirect("/physicaltherapy");
        }
    })
}