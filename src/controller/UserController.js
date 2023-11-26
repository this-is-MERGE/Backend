const User = require("../model/User");
exports.session_check = (req,res,next) =>{
    if(!req.session.user)
        return res.redirect("/signin");
    else {
        console.log(req.session);
        next();
    }
}
exports.already_login = (req,res,next) =>{
    if(!req.session.user){
        next();
        }
    else {
        console.log("already_login");
        return res.redirect('/patient');
    }
}
exports.check_physical_therapist = (req,res,next) =>{
    if(req.session.category !== "Physical_Therapist") {
        return res.redirect("/patient");
    }
    else {
        next();
    }
}

exports.startpage = (req,res) =>{
    res.render("초기화면");
}
//메인화면=회원가입화면
exports.signup = (req, res) => {
    res.render("회원가입 페이지");
}
//User 정보 저장하기
exports.post_user = (req, res) => {
    console.log(req.body);
    User.select(req.body.LOGIN_ID,req.body.PASSWORD, function (result) {
        if (result == null) {
            User.insert(req.body, function (result) {
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
    return res.render("로그인화면");
}

//로그아웃 및 세션 파괴
exports.logout = (req,res)=>{
    req.session.destroy(function(){
        //첫 페이지로 이동
        res.redirect('/');
    });
}
//login 시도
exports.post_login = (req, res) => {
    console.log(req.body);
    //LOGIN_ID와 PASSWORD를 User.js에 값을 넘겨준다.
    User.select( req.body.LOGIN_ID, req.body.PASSWORD, function (result) {
        if (result == null) {
            //결과 값과 flag false 값을 넘겨준다.
            return res.send({result: result, flag: false});
        } else{
            if (req.body.PASSWORD !== result.PASSWORD) {
                return res.send({result: result, flag: false});
            }else {
                // 관리자 승인이 된 계정인지 확인 후 세션 발급
                if(result.APPROVAL === 'Y'){
                    //세선 발급하는 과정. DB session 테이블에 생성된다.
                    req.session.user = result.LOGIN_ID;
                    req.session.category = result.CATEGORY;
                    req.session.save(() => { // 세션 객체에 저장할 수 있는 express-session 메소드.
                        console.log(req.session);
                    })
                    return res.send({result: result, flag: true, approval: true });
                }
                //추후 res.reder로 변경 해야함 임시 방편?? 이부분 고민해봐야함
                else{
                    return res.send({result: result, flag: true ,approval: false});
                }
            }
        }
    });
}

//회원정보 수정 화면(개발 아직 안됨)
exports.edit = (req, res) => {
    User.get_user( req.body.id, function (result) {
        res.render("edit", {data: result[0]});
    });
}


