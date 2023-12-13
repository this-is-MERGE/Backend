const TotalRePort = require("../model/TotalReport");
const Patient = require("../model/Patient");
exports.get_Total_Report_Info = (req,res) =>{
    Patient.get_report_patient_info(req.params.PATIENT_ID,function (result){
        if(result.error){
            return res.json({result : result.error, flag: false});
        }
        let promises = [];
        promises.push(result);
    TotalRePort.get_Total_Report_Info(req.params.PATIENT_ID, function (info) {
        if(info.error){
            return res.json({result : info.error, flag: false});
        }
        else {
            info.forEach(function (info_item) {
                const data_type = info_item.DATA_TYPE;
                const start_date = info_item.START_DATE;
                const end_date = info_item.END_DATE;
                if(data_type === "WEIGHT" || data_type === "SKELETAL_MUSCLE_MASS" || data_type === "BODY_FAT_MASS") {
                    let promise = new Promise((resolve, reject) => {
                        TotalRePort.get_Total_Report_detail_Info(
                            req.params.PATIENT_ID,
                            data_type,
                            start_date,
                            end_date,
                            function (detail_info) {
                                try {
                                    const data_type_value = detail_info.map(item => item[data_type]);
                                    detail_info.push(info_item);
                                    console.log(data_type_value);
                                    if (data_type_value.length > 0) {
                                        info_item.max = Math.max(...data_type_value);
                                        info_item.min = Math.min(...data_type_value);
                                        console.log("Max:", info_item.max);
                                        console.log("Min:", info_item.min);
                                    } else {
                                        console.log("내용이 존재하지 않습니다.");
                                        info_item.max = null;
                                        info_item.min = null;
                                    }
                                    resolve(detail_info);
                                } catch (error) {
                                    console.error(error);
                                    reject('세부 정보를 처리하는 중 오류가 발생했습니다.');
                                }
                            }
                        )
                    });
                    promises.push(promise);
                }
                else{
                    let promise = new Promise((resolve, reject) => {
                        TotalRePort.get_Total_Report_detail_Info(
                            req.params.PATIENT_ID,
                            data_type,
                            start_date,
                            end_date,
                            function (detail_info) {
                                try {
                                    console.log(detail_info);
                                    const data_type_value = detail_info.map(item => item.COUNT);
                                    detail_info.push(info_item);
                                    console.log(data_type_value);
                                    if (data_type_value.length > 0) {
                                        info_item.max = Math.max(...data_type_value);
                                        info_item.min = Math.min(...data_type_value);
                                        console.log("Max:", info_item.max);
                                        console.log("Min:", info_item.min);
                                    } else {
                                        console.log("내용이 존재하지 않습니다.");
                                        info_item.max = null;
                                        info_item.min = null;
                                    }
                                    resolve(detail_info);
                                } catch (error) {
                                    console.error(error);
                                    reject('세부 정보를 처리하는 중 오류가 발생했습니다.');
                                }
                            }
                        )
                    });
                    promises.push(promise);
                }
            });
            Promise.all(promises)
                .then((result) => {
                    return res.json(result);
                    })
                .catch((error) => {
                    console.error(error);
                    return res.json({ error: '세부 정보를 검색하는 중 오류가 발생했습니다.', flag: false });
                });
        }
    });
    })
};
exports.add_Total_Report_Info = (req,res) =>{
    TotalRePort.add_Total_Report_Info(req.params.PATIENT_ID, req.body.DATA_TYPE,req.body.X_UNIT,req.body.START_DATE,
        req.body.END_DATE,req.body.X_INTERVAL,req.body.Y_UNIT,function (result) {
        if(result.error){
            return res.json(result.error);
        }
        return res.json({flag:true});
    })
}

exports.delete_Total_Report_Info = (req,res) =>{
    TotalRePort.delete_Total_Report_Info(req.params.TOTAL_REPORT_ID,function (result) {
            if(result.error){
                return res.json(result.error);
            }
            return res.json({flag:true});
        })
}