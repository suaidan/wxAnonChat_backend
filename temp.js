let tokens = require("./token");
var dbMethod = require("./dbMethod");
var db = require("./db");
var User = db.User;
function handleToken(data,resData,ws) {
    var audience = data.name;
    var pwd="temppwd";
    var resData = {name: audience};//返回的数据
    function makeToken(regis) {
        resData.token = tokens.generateToken(audience,pwd,regis);
        resData.registered = regis;
    }
    if(data.token==="notoken"){//不存在token
        var token=makeToken(false);
    }else if(data.oldname!==undefined){//用户名没有改变
        var verifyResult = tokens.verifyToken(audience, data.token);
        let newToken=AnaVerifyResult(verifyResult);
    }
}

function AnaVerifyResult(result) {
    if (result.err) {//token出错
        var err = result.err;
        if (err.message == "jwt expired") {//超时
            if (verifyResult.registered == false) {
                //token超时且用户未注册
                makeToken(false);
            }
            if (verifyResult.registered == true) {
                //token超时且用户已注册
                makeToken(true);
            }
        } else if (err.message = "invalid token") {
            //伪造的token
            resData = {reason: "token is invalid", token: ""}
        } else {
            resData = {reason: err, token: ""}
        }
        console.log("token is wrong: %s", err);
    } else {//token正确
        console.log(verifyResult);
        if (verifyResult.registered) {
            makeToken(true);//用户已经注册，延长token的有效期，从现在开始的30days。
        } else {
            makeToken(true);//resData.token=data.token;//token有效，但是为临时的，这里就不对token进行更改
        }

    }
}