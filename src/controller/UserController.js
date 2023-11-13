const User = require("../model/User");



exports.startpage = (req,res) =>{
    if(!req.session.user)
        return res.render("signin.html");
    else{
        console.log(req.session.user);
        return res.render("index.html");
    }
}
//메인화면=회원가입화면
exports.signup = (req, res) => {
    res.render("signup.html");
}

//User 정보 저장하기
exports.post_user = (req, res) => {
    console.log(req.body);
    User.select(req.body.LOGIN_ID,req.body.PASSWORD, function (result) {
        if (result == null) {
            User.insert( req.body, function (result) {
                return res.send({result: result, flag: true});
            })
        } else{
            if (req.body.PASSWORD !== result.PASSWORD) {
                return res.send({result: result, flag: false});
            }else {
                return res.send({result: result, flag: false});
            }
        }
    });
}

//login 화면
exports.signin = (req, res) => {
    res.render("signin.html");
}

exports.index = (req, res,next) => {
    res.render("index.html");
}


exports.logout = (req,res)=>{
    req.session.destroy(function(){
        res.redirect('/');
    });
}

//login 시도
exports.post_login = (req, res) => {
    console.log(req.body);
    User.select( req.body.LOGIN_ID, req.body.PASSWORD, function (result) {
        if (result == null) {
            return res.send({result: result, flag: false});
        } else{
            if (req.body.PASSWORD !== result.PASSWORD) {
                return res.send({result: result, flag: false});
            }else {
                req.session.user = result.LOGIN_ID;
                req.session.save(() => { // 세션 객체에 저장할 수 있는 express-session 메소드.
                    console.log(result.id);
                    console.log(result.PASSWORD);
                    console.log(result);
                    console.log(req.session);
                })
                return res.send({result: result, flag: true});
            }
        }
    });
}

//회원정보 수정 화면
exports.edit = (req, res) => {
    User.get_user( req.body.id, function (result) {
        res.render("edit", {data: result[0]});
    });
}