/* ./model/User.js */
const mysql = require("mysql");
const dbConfig = require("../../config/database.js")

const connection = mysql.createConnection(dbConfig);

//전체 환자 목록 조회 데이터 콜백
exports.search_all_patient = (cb) => {
    let sql = `SELECT p.PATIENT_ID,
                      p.GENDER, 
                      p.AGE, 
                      p.ADDRESS, 
                      p.PHONE_NUMBER,
                      p.RESIDENT_REGISTARTION_NUMBER, 
                      p.SPECIAL_NOTE,
                      p.PHYSICAL_INFO, 
                      p.USER_ID, 
                      u.USER_NAME,
                      DATE_FORMAT(p.LAST_TREATMENT_DATE, '%Y-%m-%d') AS LAST_TREATMENT_DATE,
                      DATE_FORMAT(p.RESERVATION_DATE, '%Y-%m-%d %H:%i') AS RESERVATION_DATE
                      FROM patient p JOIN user u ON p.USER_ID = u.USER_ID;`;
    connection.query( sql, function(err, rows){
        if ( err ) throw err;
        cb(rows);
    });
}
exports.search_patient = (Search_Option, Search_Keyword, cb) => {
    let sql = `SELECT p.PATIENT_ID,
                      p.GENDER,
                      p.AGE,
                      p.ADDRESS,
                      p.PHONE_NUMBER,
                      p.RESIDENT_REGISTARTION_NUMBER,
                      p.SPECIAL_NOTE,
                      p.PHYSICAL_INFO,
                      p.USER_ID,
                      u.USER_NAME,
                      DATE_FORMAT(p.LAST_TREATMENT_DATE, '%Y-%m-%d') AS LAST_TREATMENT_DATE,
                      DATE_FORMAT(p.RESERVATION_DATE, '%Y-%m-%d %H:%i')  AS RESERVATION_DATE 
                      FROM patient p 
                      JOIN user u ON p.USER_ID = u.USER_ID WHERE p.${Search_Option} LIKE '%${Search_Keyword}%';`;
    connection.query( sql, function(err, rows){
        if ( err ) throw err;
        cb(rows);
    });
}

exports.delete_patient =(NAME, RESIDENT_REGISTARTION_NUMBER, cb) => {
    let sql = `DELETE FROM patient WHERE RESIDENT_REGISTARTION_NUMBER = '${RESIDENT_REGISTARTION_NUMBER}';`;
    connection.query( sql, function(err, rows){
        if ( err ){
            console.error("환자 삭제 중 에러 발생:", err);
            return cb({ error: "환자 삭제 중 에러 발생" });
        }
        cb(rows);
    });
}
