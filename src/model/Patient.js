/* ./model/User.js */
const mysql = require("mysql");
const dbConfig = require("../../config/database.js")

const connection = mysql.createConnection(dbConfig);

//전체 환자 목록 조회 데이터 콜백
exports.search_all_patient = (cb) => {
    let Patient_Query = `SELECT p.PATIENT_ID,
                      p.PATIENT_NAME,
                      p.GENDER,
                      p.AGE,
                      p.ADDRESS,
                      p.PHONE_NUMBER,
                      p.RESIDENT_REGISTRATION_NUMBER,
                      p.SPECIAL_NOTE,
                      u.USER_NAME,
                      u.DEPARTMENT,
                      DATE_FORMAT(p.LAST_TREATMENT_DATE, '%Y-%m-%d') AS LAST_TREATMENT_DATE,
                      DATE_FORMAT(p.RESERVATION_DATE, '%Y-%m-%d %H:%i') AS RESERVATION_DATE
               FROM patient p JOIN user u ON p.USER_ID = u.USER_ID;`;
    let User_Query = `SELECT USER_NAME, DEPARTMENT FROM user WHERE CATEGORY = 'DOCTOR';`;
    //첫 번째 쿼리 실행
    connection.query(Patient_Query, function(err, patientRows) {
        if (err) throw err;

        // 두 번째 쿼리 실행
        connection.query(User_Query, function(err, userRows) {
            if (err) throw err;
            console.log('Patient Information:', patientRows);
            console.log('User Information:', userRows);
            cb({ patients: patientRows, users: userRows });
        });
    });
}
exports.search_patient = (Search_Option, Search_Keyword, cb) => {
    let Patient_Query = `SELECT p.PATIENT_ID,
                      p.PATIENT_NAME,
                      p.GENDER,
                      p.AGE,
                      p.ADDRESS,
                      p.PHONE_NUMBER,
                      p.RESIDENT_REGISTRATION_NUMBER,
                      p.SPECIAL_NOTE,
                      u.USER_NAME,
                      u.DEPARTMENT,
                      DATE_FORMAT(p.LAST_TREATMENT_DATE, '%Y-%m-%d') AS LAST_TREATMENT_DATE,
                      DATE_FORMAT(p.RESERVATION_DATE, '%Y-%m-%d %H:%i')  AS RESERVATION_DATE
               FROM patient p
                        JOIN user u ON p.USER_ID = u.USER_ID WHERE p.${Search_Option} LIKE '%${Search_Keyword}%';`;
    let User_Query = `SELECT USER_NAME, DEPARTMENT FROM user WHERE CATEGORY = 'DOCTOR';`;
    //첫 번째 쿼리 실행
    connection.query(Patient_Query, function(err, patientRows) {
        if (err) throw err;

        // 두 번째 쿼리 실행
        connection.query(User_Query, function(err, userRows) {
            if (err) throw err;
            console.log('Patient Information:', patientRows);
            console.log('User Information:', userRows);
            cb({ patients: patientRows, users: userRows });
        });
    });
}
exports.delete_patient =(PATIENT_ID, cb) => {
    let sql = `DELETE FROM patient WHERE PATIENT_ID = ${PATIENT_ID};`;
    connection.query( sql, function(err, rows){
        if ( err ){
            console.error("환자 삭제 중 에러 발생:", err);
            return cb({ error: "환자 삭제 중 에러 발생" });
        }
        cb(rows);
    });
}
exports.add_patient = (GENDER,AGE,ADDRESS,PHONE_NUMBER,RESIDENT_REGISTRATION_NUMBER ,SPECIAL_NOTE,NAME,USER_NAME,DEPARTMENT, cb) => {
    let user_table = `SELECT USER_ID FROM user WHERE USER_NAME = '${USER_NAME}' AND DEPARTMENT = '${DEPARTMENT}' `;
    connection.query(user_table, function (err,user_rows){
        if(err){
            console.error("의사 정보 조회 중 에러 발생:", err);
            return cb({ error: "의사 정보 조회 중 에러 발생:" });
        }
        if(user_rows.length ===0){
            console.error("의사 정보 없음");
            return cb({error: "의사 정보 없음"});
        }
        console.log(user_rows[0].USER_ID);
        let USER_ID = user_rows[0].USER_ID;
        let sql = `INSERT INTO patient (GENDER, AGE, ADDRESS, PHONE_NUMBER,
                                        RESIDENT_REGISTRATION_NUMBER, SPECIAL_NOTE,
                                        PATIENT_NAME,USER_ID)  VALUES
                       ('${GENDER}',${AGE},'${ADDRESS}',${PHONE_NUMBER},${RESIDENT_REGISTRATION_NUMBER},'${SPECIAL_NOTE}',
                        '${NAME}',${USER_ID});`;
        connection.query(sql, function (err,rows){
            if(err){
                console.error("환자 추가 중 에러 발생:", err);
                return cb({error : "환자 추가 중 에러 발생:" });
            }
            cb(rows);
        });
    });
}
exports.modify_patient = (PATIENT_ID,GENDER,AGE,ADDRESS,PHONE_NUMBER,RESIDENT_REGISTRATION_NUMBER ,SPECIAL_NOTE,PATIENT_NAME,USER_NAME,DEPARTMENT, cb) => {
    let user_table = `SELECT USER_ID FROM user WHERE USER_NAME = '${USER_NAME}' AND DEPARTMENT = '${DEPARTMENT}'`;
    connection.query(user_table, function (err,user_rows){
        if(err){
            console.error("의사 정보 조회 중 에러 발생:", err);
            return cb({ error: "의사 정보 조회 중 에러 발생:" });
        }
        if(user_rows.length ===0){
            console.error("의사 정보 없음");
            return cb({error: "의사 정보 없음"});
        }
        let USER_ID = user_rows[0].USER_ID;
        let sql = `
            UPDATE patient
            SET GENDER       = '${GENDER}',
                AGE          = ${AGE},
                ADDRESS      = '${ADDRESS}',
                PHONE_NUMBER = ${PHONE_NUMBER},
                SPECIAL_NOTE = '${SPECIAL_NOTE}',
                PATIENT_NAME = '${PATIENT_NAME}',
                USER_ID      = ${USER_ID},
                RESIDENT_REGISTRATION_NUMBER   = ${RESIDENT_REGISTRATION_NUMBER}
            WHERE PATIENT_ID = ${PATIENT_ID};`;
        connection.query(sql, function (err, rows) {
            if (err) {
                console.error("환자 수정 중 에러 발생:", err);
                return cb({error: "환자 수정 중 에러 발생:"});
            }
            cb(rows);
        });
    });
}
