const express = require("express");
const session = require("express-session");

const MySQLStoreSession = require('express-mysql-session')(session);
const FileStore = require("session-file-store")(session);
const dbConfig = require("../config/database.js");

const app = express();
const cors = require('cors');

app.use(cors());
app.use(
    session({
        secret: '@codestates',
        resave: false,
        saveUninitialized: false, // 이 부분을 true로 설정하면 login이 안되도 세션이 생기게된다.
        store: new MySQLStoreSession(dbConfig),
        cookie:{
            secure:false,
        }// 옵션으로 이렇게 부여하고 저장하면 session 폴더가 생기게 된다. 그리고 로그인을 하면 세션 객체가 파일안에 생성이 된다.
    })
);
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
app.use(cookieParser())

const PORT = dbConfig.PORT
app.use(express.static(path.join(__dirname, '/')));
app.engine('html', require('ejs').renderFile);
app.use( express.static( "uploads" ));
app.use(express.urlencoded({extended: true}));
app.use( bodyParser.json() )
const router = require("./routes/routes.js");
const {logout} = require("./controller/UserController");
app.use("/", router);
app.listen(PORT, () => {
    console.log( 'Server Port: ',PORT);
})
