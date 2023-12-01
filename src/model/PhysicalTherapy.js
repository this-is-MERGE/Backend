const mysql = require("mysql");
const dbConfig = require("../../config/database.js");

const connection = mysql.createConnection(dbConfig);
exports.add_physical_therapy_info = (THERAPY_NAME,THERAPY_TYPE,PERFORMANCE_UNIT1,PERFORMANCE_UNIT2,cb) => {
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
            console.error("운동치료 삭제 중 에러 발생:", err);
            return cb({ error: "운동치료 삭제 중 에러 발생" });
        }
        cb(rows);
    });
}

exports.patient_therapy_info = (PATIENT_ID,cb) =>{
    let patient_therapy_data_Query = `
        SELECT t.PHYSICAL_DATA_ID,
        c.NAME,
        c.THERAPY_TYPE,
        DATE_FORMAT(t.DATE, '%Y-%m-%d %H:%i')  AS THERAPY_DATE
    FROM therapy_data t
    JOIN therapy_code c ON c.THERAPY_CODE = t.THERAPY_CODE
    WHERE t.PATIENT_ID = ${PATIENT_ID};`;

    connection.query(patient_therapy_data_Query, function (err,rows) {
      if(err){
          return cb({error : "운동치료 조회 중 에러 발생:", err});
      }
      cb(rows);
    });
}

exports.delete_physical_therapy_info = (PHYSICAL_DATA_ID, cb) =>{
    let patient_therapy_data_Query = `
    DELETE FROM therapy_data WHERE PHYSICAL_DATA_ID = ${PHYSICAL_DATA_ID};`;
    connection.query( patient_therapy_data_Query, function(err, rows){
        if ( err ){
            console.error("환자 운동치료 삭제 중 에러 발생:", err);
            return cb({ error: "환자 운동치료 삭제 중 에러 발생" });
        }
        cb(rows);
    });
}

exports.patient_therapy_detail_info = (PHYSICAL_DATA_ID,cb) =>{
    let patient_therapy_data_Query = `
        SELECT t.PHYSICAL_DATA_ID,
        t.MEMO,
        c.NAME AS THERAPY_NAME,
        c.THERAPY_TYPE,
        c.PERFORMANCE_UNIT1,
        c.PERFORMANCE_UNIT2,
        u.USER_ID,
        u.CATEGORY,
        u.USER_NAME,
        DATE_FORMAT(t.DATE, '%Y-%m-%d %H:%i')  AS THERAPY_DATE
    FROM therapy_data t
    JOIN therapy_code c ON c.THERAPY_CODE = t.THERAPY_CODE
    JOIN user u on t.USER_ID = u.USER_ID
    WHERE t.PHYSICAL_DATA_ID = ${PHYSICAL_DATA_ID};`;
    let patient_therapy_data_info_Query = `
        SELECT * FROM therapy_data_info
        WHERE PHYSICAL_DATA_ID = ${PHYSICAL_DATA_ID};`;
    //첫 번째 쿼리 샐행
    connection.query(patient_therapy_data_Query, function(err, DataRows) {
        if (err) throw err;
        // 두 번째 쿼리 실행
        connection.query(patient_therapy_data_info_Query, function(err, DataInfoRows) {
            if (err) throw err;
            console.log('therapy Information:', DataRows);
            console.log('detail therapy Information:', DataInfoRows);
            cb({ Data: DataRows, DataInfo: DataInfoRows});
        });
    });
}

exports.delete_patient_therapy_detail_info = (PHYSICAL_DATA_ID, SET, cb) => {
    let patient_therapy_data_Query = `
        DELETE
        FROM therapy_data_info
        WHERE PHYSICAL_DATA_ID = ${PHYSICAL_DATA_ID}
          AND \`SET\` = ${SET};`;
    connection.query(patient_therapy_data_Query, function (err, DataInfoRows){
      if(err){
          return cb({error : "운동치료 삭제중 에러 발생"})
      }
      cb(DataInfoRows);
    })
}

exports.add_patient_therapy_info = (DATE, MEMO, THERAPY_CODE, PATIENT_ID, USER_ID,cb) => {
    let patient_therapy_data_Query = `
        INSERT INTO therapy_data(DATE, MEMO, THERAPY_CODE, PATIENT_ID, USER_ID)
        VALUES ('${DATE}','${MEMO}',${THERAPY_CODE},${PATIENT_ID},${USER_ID});`;
    connection.query(patient_therapy_data_Query, function (err, Data_InfoRows){
        if(err){
            console.log(err);
            return cb({error : "환자 운동치료 추가중 에러 발생"});
        }
        cb(Data_InfoRows);
    })
}
exports.add_patient_therapy_detail_info = (PHYSICAL_DATA_ID,THERAPY_CODE,PERFORMANCE1,PERFORMANCE2,SET, REPS,RESULT,cb) => {
    let patient_therapy_data_Query = `
        INSERT INTO therapy_data_info(PHYSICAL_DATA_ID,PERFORMANCE1, PERFORMANCE2, \`SET\`, REPS, RESULT)
        VALUES (${PHYSICAL_DATA_ID},${PERFORMANCE1}, ${PERFORMANCE2}, ${SET}, ${REPS}, ${RESULT});`;
    connection.query(patient_therapy_data_Query,function (err, Data_InfoRows){
        if(err){
            return cb({error : "환자 세부 운동 치료 추가중 에러 발생"});
        }
        cb(Data_InfoRows);
    })
}