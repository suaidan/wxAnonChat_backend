/**
 * Created by supange.
 * statement: 根据新逻辑写的处理token的函数
 */
let tokens = require("./token");
let dbMethod = require("./dbMethod");
let db = require("./db");
let User = db.User;
function handleToken(data,resData,ws) {
    let audience = data.name;
    let pwd="temppwd";
    function makeToken(name,pwd,regis) {
        resData.token = tokens.generateToken(name,pwd,regis);
        resData.registered = regis;
    }
    if(data.token==="notoken"){//不存在token
        makeToken(audience,pwd,false);
    }
    else if(data.oldname!==undefined){//用户名发生改变
        let verResult = tokens.verifyToken(data.oldname, data.token);
        if(verResult.err){
            makeToken(audience,pwd,false);
        }
        else{//audience这里相当于新名称
           dbMethod.update(User,{"realname":verResult.aud},{"realname":audience},updateHandle);

        }

        let newToken=AnaVerifyResult(verifyResult);
    }else{//用户名未改变

    }
    function updateHandle(obj){
        if(obj.msg==="suc"){
            if(verResult.pwd==="temppwd"){
                makeToken(data.name,pwd,false);
            }else{
                dbMethod.findDoc(User,{"realname":audience},callback)
            }
        }
        if(obj.msg==="err"){

        }
    }
}

function AnaVerifyResult(result) {
    if (result.err) {//token出错

        console.log("token is wrong: %s", result.err);
    } else {//token正确
        console.log(verifyResult);
        if (verifyResult.registered) {
            makeToken(true);//用户已经注册，延长token的有效期，从现在开始的30days。
        } else {
            makeToken(true);//resData.token=data.token;//token有效，但是为临时的，这里就不对token进行更改
        }

    }
}