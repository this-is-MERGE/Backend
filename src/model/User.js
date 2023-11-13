/* ./model/User.js */
const mysql = require("mysql");
const dbConfig = require("../../config/database.js")

const connection = mysql.createConnection(dbConfig);

//회원가입 정보 입력
exports.insert = ( data, cb ) => {
    var sql = `INSERT INTO user (LOGIN_ID,PASSWORD,USER_NAME,EMAIL,CATEGORY,DEPARTMENT,APPROVAL,SIGN_UP_TIME) VALUES (
                            '${data.LOGIN_ID}','${data.PASSWORD}',
                         '${data.USER_NAME}','${data.EMAIL}','${data.CATEGORY}'
                         ,'${data.DEPARTMENT}','N','${data.SIGN_UP_TIME}');`;
    connection.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( data.USER_ID );
    });
}

//로그인 정보 읽기
exports.select = ( LOGIN_ID, PASSWORD, cb ) => {
    console.log(LOGIN_ID, PASSWORD, cb);
    var sql = `SELECT * FROM user WHERE LOGIN_ID='${LOGIN_ID}' limit 1`;
    console.log(sql);
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

