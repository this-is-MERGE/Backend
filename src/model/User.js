/* ./model/User.js */
const mysql = require("mysql");
const dbConfig = require("../../config/database.js")

const connection = mysql.createConnection(dbConfig);

//회원가입 정보 입력
exports.insert = ( data, cb ) => {
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
exports.select = (LOGIN_ID, PASSWORD, cb) => {
    var sql = `SELECT * FROM user WHERE LOGIN_ID='${LOGIN_ID}' limit 1`;
    connection.query(sql, (err, rows) => {
        console.log(rows[0]);
        if ( err ) throw err;
        cb( rows[0] );
    });
}
//회원 정보
exports.get_user = (LOGIN_ID, cb) => {
    let sql = `SELECT * FROM user WHERE id='${LOGIN_ID}' limit 1;`;

    connection.query( sql, function(err, rows){
        if ( err ) throw err;
        cb(rows);
    });
}

