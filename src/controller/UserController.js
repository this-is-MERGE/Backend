const User = require("../model/User");
exports.session_check = (req,res,next) =>{
    if(!req.session.user_id)
        return res.json({session : false});
    else {
        console.log(req.session);
        next();
    }
}
exports.check_physical_therapist = (req,res,next) =>{
    if(!req.session.user_id)
        return res.json({session : false});
    else if(req.session.category !== "Physical_Therapist"|| req.session.category !== "MASTER") {
        return res.json({session: true, Authorization : req.session.category});
    }
    else {
        next();
    }
}
exports.check_doctor_nurse = (req,res,next) =>{
    if(!req.session.user_id)
        return res.json({session : false});
    else if(req.session.category !== "DOCTOR" && req.session.category !== "NURSE"&& req.session.category !== "MASTER" ) {
        return res.json({session: true, Authorization : req.session.category});
    }
    else {
        next();
    }
}
exports.check_master = (req,res,next) => {
    if(!req.session.user_id)
        return res.json({session : false});
    else if(req.session.category !== "MASTER"){
        return res.json({session: true, Authorization : req.session.category});
    }
    else{
        next();
    }

}
//User 정보 저장하기
exports.post_user = (req, res) => {
    console.log(req.body);
    User.select(req.body.LOGIN_ID,req.body.PASSWORD, function (result) {
        if (result == null) {
            User.insert(req.body, function (result) {
                return res.json({result: result, flag: true});
            })
        } else{
            if (req.body.LOGIN_ID !== result.LOGIN_ID) {
                return res.json({result: result, flag: false});
            }else {
                return res.json({result: result, flag: false});
            }
        }
    });
}


//로그아웃 및 세션 파괴
exports.logout = (req,res)=>{
    req.session.destroy(function(){
        //첫 페이지로 이동
        res.json({result : "logout"});
    });
}
//login 시도
exports.post_login = (req, res) => {
    console.log(req.body);
    //LOGIN_ID와 PASSWORD를 User.js에 값을 넘겨준다.
    User.select( req.body.LOGIN_ID, req.body.PASSWORD, function (result) {
        if (result == null) {
            //결과 값과 flag false 값을 넘겨준다.
            return res.json({result: result, flag: false});
        } else{
            if (req.body.PASSWORD !== result.PASSWORD) {
                return res.json({result: result, flag: false});
            }else {
                // 관리자 승인이 된 계정인지 확인 후 세션 발급
                if(result.APPROVAL === 'Y'){
                    //세선 발급하는 과정. DB session 테이블에 생성된다.
                    req.session.user_id = result.USER_ID;
                    req.session.user_name= result.USER_NAME;
                    req.session.category = result.CATEGORY;
                    req.session.save(() => { // 세션 객체에 저장할 수 있는 express-session 메소드.
                        console.log(req.session);
                    })
                    return res.json({result: result, session: req.session, flag: true, approval: true });
                }
                else{
                    return res.json({result: result, flag: true ,approval: false});
                }
            }
        }
    });
}
exports.get_user_info = (req,res) =>{
    User.get_user_info(req.session.user_id, function (result){
       res.json(result);
    });
}

exports.edit_user_info = (req, res) => {
    User.edit_user_info( req.session.user_id,req.body,function (err) {
        if(err) res.json({ flag: false, error: "에러가 발생했습니다." });
        else{
            res.json({ flag: true});
        }
    });
}

exports.master_get_user_info = (req,res) =>{
    User.master_get_user_info(function (err,result) {
        if(err) res.json({flag:false, error: "에러가 발생했습니다."});
        else{
            res.json(result);
        }
    });
}

exports.master_delete_user_info = (req,res) =>{
    User.master_delete_user_info(req.params.USER_ID,function (err){
        if(err) res.json({flag:false, error: "에러가 발생했습니다."});
        else{
            res.json({flag: true});
        }
    })
}

exports.master_edit_user_info = (req, res) => {
    User.master_edit_user_info(req.params.USER_ID,req.body,function (err) {
        if(err) res.json({ flag: false, error: "에러가 발생했습니다." });
        else{
            res.json({ flag: true});
        }
    });
}

exports.master_get_user_approval_info = (req,res) =>{
    User.master_get_user_approval_info(function (err,result) {
        if(err) res.json({ flag: false, error: "에러가 발생했습니다." });
        else{
            res.json(result);
        }
    });
}

exports.master_user_approve = (req,res) =>{
    User.master_user_approve(req.params.USER_ID,function (err) {
        if(err) res.json({ flag: false, error: "에러가 발생했습니다." });
        else{
            res.json({flag: true});
        }
    });
}