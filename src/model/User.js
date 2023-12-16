/* ./model/User.js */
const mysql = require("mysql");
const dbConfig = require("../../config/database.js")

const connection = mysql.createConnection(dbConfig);

//회원가입 정보 입력
exports.insert = ( data, cb ) => {
    let SIGN_UP_TIME = new Date().toISOString().replace("T"," ").substring(0, 19);
    var sql = `INSERT INTO user (LOGIN_ID,PASSWORD,USER_NAME,PHONE_NUMBER,EMAIL,CATEGORY,DEPARTMENT,APPROVAL,SIGN_UP_TIME) VALUES (
                            '${data.LOGIN_ID}','${data.PASSWORD}',
                         '${data.USER_NAME}',${data.PHONE_NUMBER},'${data.EMAIL}','${data.CATEGORY}'
                         ,'${data.DEPARTMENT}','N','${SIGN_UP_TIME}');`;
    connection.query(sql, (err) => {
        if ( err ){
            cb(err);
        }
        else {
            cb(data);
        }
    });
}

//로그인 정보 읽기
exports.select = (LOGIN_ID, PASSWORD, cb) => {
    var sql = `SELECT * FROM user WHERE LOGIN_ID='${LOGIN_ID}' limit 1`;
    connection.query(sql, (err, rows) => {
        if (err) {
            console.error('Error executing select query:', err);
            cb(err);
        } else {
            if (rows.length > 0) {
                console.log(rows[0]);
                cb(rows[0]);
            } else {
                // 사용자를 찾지 못한 경우
                cb(null);
            }
        }
    });
}

//회원 정보
exports.get_user_info = (USER_ID, cb) => {
    let sql = `SELECT * FROM user WHERE USER_ID='${USER_ID}' limit 1;`;
    connection.query( sql, function(err, rows){
        if ( err ) throw err;
        cb(rows);
    });
}
exports.edit_user_info = (USER_ID,data, cb) =>{
    var sql = `
            UPDATE user
            SET LOGIN_ID          = '${data.LOGIN_ID}',
                PASSWORD          = '${data.PASSWORD}',
                PHONE_NUMBER      = ${data.PHONE_NUMBER},
                EMAIL             = '${data.EMAIL}'
            WHERE USER_ID = ${USER_ID};`;
    connection.query(sql, (err, rows) => {
        if ( err ){
            cb(err);
        }
        cb(null,rows);
    });
}

exports.master_get_user_info = (cb) =>{
    var sql = `SELECT * FROM user WHERE CATEGORY <> 'MASTER' AND APPROVAL = 'Y';`;
    connection.query(sql,function (err,rows){
        if(err){
            cb(err);
        }
        cb(null,rows);
    })
}

exports.master_delete_user_info = (USER_ID,cb) =>{
    let sql = `DELETE FROM user WHERE USER_ID = ${USER_ID};`;
    connection.query( sql, function(err, rows){
        if ( err ){
            console.error("유저 삭제 중 에러 발생:", err);
            return cb(err);
        }
        cb(null,rows);
    });
}

exports.master_edit_user_info = (USER_ID, data, cb) =>{
    var sql = `
            UPDATE user
            SET USER_NAME         = '${data.USER_NAME}',
                CATEGORY          = '${data.CATEGORY}',
                DEPARTMENT        = '${data.DEPARTMENT}',
                LOGIN_ID          = '${data.LOGIN_ID}',
                PASSWORD          = '${data.PASSWORD}',
                PHONE_NUMBER      = ${data.PHONE_NUMBER},
                EMAIL             = '${data.EMAIL}'
            WHERE USER_ID = ${USER_ID};`;
    connection.query(sql, (err, rows) => {
        if ( err ){
            cb(err);
        }
        cb(null,rows);
    });
}

exports.master_get_user_approval_info = (cb) =>{
    var sql = `SELECT * FROM user;`;
    connection.query(sql,function (err,rows){
        if(err){
            cb(err);
        }
        cb(null,rows);
    })
}

exports.master_user_approve = (USER_ID, cb) =>{
    var sql = `
            UPDATE user
            SET APPROVAL         = 'Y'
            WHERE USER_ID = ${USER_ID};`;
    connection.query(sql, (err, rows) => {
        if ( err ){
            cb(err);
        }
        cb(null,rows);
    });
}
