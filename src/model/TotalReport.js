const mysql = require("mysql");
const dbConfig = require("../../config/database.js");
const connection = mysql.createConnection(dbConfig);

exports.get_Total_Report_Info =(PATIENT_ID, cb) => {
    let sql = `SELECT TOTAL_REPORT_ID,
                      DATA_TYPE,
                      X_UNIT,
                      X_INTERVAL,
                      Y_UNIT,
                      DATE_FORMAT(START_DATE, '%Y-%m-%d %H:%i:%s') as START_DATE,
                      DATE_FORMAT(END_DATE, '%Y-%m-%d %H:%i:%s') as END_DATE
                      
                FROM total_report WHERE PATIENT_ID = ${PATIENT_ID};`;
    connection.query( sql, function(err, rows){
        if ( err ){
            console.error("종합리포트 조회 중 에러 발생:", err);
            return cb({ error: "종합리포트 조회 중 에러 발생" });
        }
        if (rows.affectedRows === 0) {
            return cb({ error: "해당하는 환자를 찾을 수 없습니다." });
        }
        cb(rows);
    });
}
exports.get_Total_Report_detail_Info =(PATIENT_ID,data_type,start_date,end_date, cb) => {
    if (data_type === "WEIGHT" || data_type === "SKELETAL_MUSCLE_MASS" || data_type === "BODY_FAT_MASS") {
        let sql = `SELECT DATE_FORMAT(e.EXAMINE_DATE, '%Y-%m-%d %H:%i:%s') as EXAMINE_DATE, i.${data_type}
                   FROM in_body i
                            JOIN examine_data e on e.EXAMINE_DATA_ID = i.EXAMINE_DATA_ID
                            JOIN chart c on c.CHART_ID = e.CHART_ID
                   WHERE c.PATIENT_ID = ${PATIENT_ID}
                     AND e.EXAMINE_DATE >= STR_TO_DATE('${start_date}', '%Y-%m-%d %H:%i:%s')
                     AND e.EXAMINE_DATE <= STR_TO_DATE('${end_date}', '%Y-%m-%d %H:%i:%s');`;
        connection.query(sql, function (err, rows) {
            console.log(rows);
            if (err) {
                console.error("종합리포트 조회 중 에러 발생:", err);
                return cb({error: "종합리포트 조회 중 에러 발생"});
            }
            cb(rows);
        });
    }
    else{
        let sql = `SELECT DATE_FORMAT(e.EXAMINE_DATE, '%Y-%m-%d %H:%i:%s') as EXAMINE_DATE, r.COUNT
                   FROM examine_result r
                            JOIN examine_data e on e.EXAMINE_DATA_ID = r.EXAMINE_DATA_ID
                            JOIN chart c on c.CHART_ID = e.CHART_ID
                   WHERE c.PATIENT_ID = ${PATIENT_ID}
                     AND e.CATEGORY_2 = '${data_type}'
                     AND e.EXAMINE_DATE >= STR_TO_DATE('${start_date}', '%Y-%m-%d %H:%i:%s')
                     AND e.EXAMINE_DATE <= STR_TO_DATE('${end_date}', '%Y-%m-%d %H:%i:%s');`;
        connection.query(sql, function (err, rows) {
            console.log(rows);
            if (err) {
                console.error("종합리포트 조회 중 에러 발생:", err);
                return cb({error: "종합리포트 조회 중 에러 발생"});
            }
            cb(rows);
        });
    }
}

exports.add_Total_Report_Info=(PATIENT_ID,DATA_TYPE,X_UNIT,START_DATE,END_DATE,X_INTERVAL,Y_UNIT,cb) => {
    let sql = `INSERT INTO total_report (PATIENT_ID, DATA_TYPE, X_UNIT, START_DATE,END_DATE,X_INTERVAL,Y_UNIT)  VALUES
                   (${PATIENT_ID},'${DATA_TYPE}',${X_UNIT},${START_DATE},${END_DATE},${X_INTERVAL},${Y_UNIT});`;
    connection.query(sql, function (err,rows){
        if(err){
            console.error("종합리포트 추가 중 에러 발생:", err);
            return cb({ error: "종합리포트 추가 중 에러 발생" });
        }
        cb(rows);
    });
}

exports.delete_Total_Report_Info=(TOTAL_REPORT_ID,cb) =>{
    let sql = `
    DELETE FROM total_report WHERE TOTAL_REPORT_ID = ${TOTAL_REPORT_ID};`;
    connection.query( sql, function(err, rows){
        if ( err ){
            console.error("종합리포트 삭제 중 에러 발생:", err);
            return cb({ error: "종합리포트 삭제 중 에러 발생" });
        }
        if (rows.affectedRows === 0) {
            return cb({ error: "해당하는 종합리포트를 찾을 수 없습니다." });
        }
        cb(rows);
    });
}

