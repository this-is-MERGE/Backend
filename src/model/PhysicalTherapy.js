const mysql = require("mysql");
const dbConfig = require("../../config/database.js");

const connection = mysql.createConnection(dbConfig);
exports.add_physical_info = (THERAPY_NAME,THERAPY_TYPE,PERFORMANCE_UNIT1,PERFORMANCE_UNIT2,cb) => {
    let sql = `INSERT INTO therapy_code (NAME, THERAPY_TYPE, PERFORMANCE_UNIT1, PERFORMANCE_UNIT2)  VALUES
                   ('${THERAPY_NAME}','${THERAPY_TYPE}','${PERFORMANCE_UNIT1}','${PERFORMANCE_UNIT2}');`;
    connection.query(sql, function (err,rows){
        if(err){
            console.error("운동 추가 중 에러 발생:", err);
        }
        cb(rows);
    });
}
exports.physical_therapy_info =(cb) => {
    let physical_therapy_Query = `SELECT THERAPY_CODE,
                                         NAME,
                                         THERAPY_TYPE,
                                         PERFORMANCE_UNIT1,
                                         PERFORMANCE_UNIT2
                                  FROM therapy_code;`;
    connection.query(physical_therapy_Query, function(err, physical_therapy_rows){
        if (err) console.log("운동 치료 조회 중 오류발생");
        else{
            cb(physical_therapy_rows);
        }
    });
}
exports.modify_physical_therapy_info = (THERAPY_CODE,THERAPY_NAME,THERAPY_TYPE,PERFORMANCE_UNIT1,PERFORMANCE_UNIT2,cb) => {
    let physical_therapy_Query = `
            UPDATE therapy_code
            SET NAME             = '${THERAPY_NAME}',
                THERAPY_TYPE       = '${THERAPY_TYPE}',
                PERFORMANCE_UNIT1  = '${PERFORMANCE_UNIT1}',
                PERFORMANCE_UNIT2  = '${PERFORMANCE_UNIT2}'
            WHERE THERAPY_CODE      =  ${THERAPY_CODE}`;
    connection.query(physical_therapy_Query, function (err, rows) {
        if (err) {
            console.error("운동치료 수정 중 에러 발생:", err);
            return cb({error: "운동치료 수정 중 에러 발생:"});
        }
        cb(rows);
    });
}
exports.delete_physical_therapy_info =(THERAPY_CODE, cb) => {
    let physical_therapy_Query = `DELETE FROM therapy_code WHERE THERAPY_CODE = ${THERAPY_CODE};`;
    connection.query( physical_therapy_Query, function(err, rows){
        if ( err ){
            console.error("환자 삭제 중 에러 발생:", err);
            return cb({ error: "환자 삭제 중 에러 발생" });
        }
        cb(rows);
    });
}
