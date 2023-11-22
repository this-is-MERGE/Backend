/* ./model/User.js */
const mysql = require("mysql");
const dbConfig = require("../../config/database.js")

const connection = mysql.createConnection(dbConfig);

//회원가입 정보 입력
exports.insert_user_info = ( data, cb ) => {
    console.log(data);
    let SIGN_UP_TIME = new Date();
    var sql = `INSERT INTO user (LOGIN_ID,PASSWORD,USER_NAME,PHONE_NUMBER,EMAIL,CATEGORY,DEPERTMENT,APPROVAL,SIGN_UP_TIME) VALUES (
                            '${data.LOGIN_ID}','${data.PASSWORD}',
                         '${data.USER_NAME}','${data.PHONE_NUMBER}','${data.EMAIL}','${data.CATEGORY}'
                         ,'${data.DEPERTMENT}','N','${SIGN_UP_TIME.toISOString().replace("T"," ").substring(0, 19)}');`;
    connection.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( data.USER_ID );
    });
}

//로그인 정보 읽기
exports.select_user_info = (LOGIN_ID, PASSWORD, cb) => {
    var sql = `SELECT * FROM user WHERE LOGIN_ID='${LOGIN_ID}' limit 1`;
    connection.query(sql, (err, rows) => {
        console.log(rows[0]);
        if ( err ) throw err;
        cb( rows[0] );
    });
}
//회원 정보
exports.get_user_info = (LOGIN_ID, cb) => {
    let sql = `SELECT * FROM user WHERE id='${LOGIN_ID}' limit 1;`;

    connection.query( sql, function(err, rows){
        if ( err ) throw err;
        cb(rows);
    });
}

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
                      DATE_FORMAT(p.RESERVATION_DATE, '%Y-%m-%d') AS RESERVATION_DATE
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
                      DATE_FORMAT(p.RESERVATION_DATE, '%Y-%m-%d')  AS RESERVATION_DATE 
                      FROM patient p 
                      JOIN user u ON p.USER_ID = u.USER_ID WHERE p.${Search_Option} LIKE '%${Search_Keyword}%';`;
    connection.query( sql, function(err, rows){
        if ( err ) throw err;
        cb(rows);
    });
}


