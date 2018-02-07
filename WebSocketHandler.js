/**
 * Created by 一苏 on 2017/11/30.
 */
let tokens = require("./token");
let dbMethod = require("./dbMethod");
let db = require("./db");
let User = db.User;

/**
 * 处理不同的token
 * @param data
 * @param resdata
 * @param ws
 */
function handleToken(data, resdata, ws) {
    let audience = data.name;
    let pwd="";
    let resData = {name: audience};//返回的数据
    function makeToken(regis) {
        resData.token = tokens.generateToken(audience, pwd,regis);
        resData.registered = regis;
    }

    //查询数据库,比较耗费时间。
    let query = {'realname': audience}
//     let doc=dbMethod.findDoc(User,query);
//     if(doc.indexOf(err)){
//         console.log(err)
//     }
    function handleDoc(doc) {
        /**
         * 这里主要是验证现在传进来的用户名是否和数据库中的一样
         * 若用户更改，则对数据库进行更新，并且使用旧名称进行token验证
         * 若验证成功，就使用新名称进行重新生成token。
         */
        if(doc.msg==="suc"||doc.data!==null){
            if(doc[0].realname!==audience){
                let query={'realname':doc[0].realname};
                dbMethod.update(User,query,{"realname":audience});
                audience=doc[0].realname;
                pwd=doc[0].pwd;
            }
        }
        if (data.token === "notoken") {//不存在token
            makeToken(false);
            return resData;
        } else if (data.token.length > 0) {
            let verifyResult = tokens.verifyToken(audience, data.token);
            if (verifyResult.err) {//token出错
                let err = verifyResult.err;
                if (err.message === "jwt expired") {//超时
                    if (verifyResult.registered === false) {
                        //token超时且用户未注册
                        makeToken(false);
                    }
                    if (verifyResult.registered === true) {
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
        ws.send(JSON.toString(resData));
    }
    dbMethod.findDoc(User, query,handleDoc);
    //检验token

    //todo:需要进一步编写
    //用于平时进行对话
    // let arr = new Array({id:123,name:"supange",text:"smart",count:10,updated:"2017-1-12"},
    //   { id: 234, name: "spg",text: "smart", updated: "2017-1-12"},
    //   { id: 345, name: "zks",text: "smart", updated: "2017-1-12"})
    // let initData = {};
    // initData.cmd = "CMD";
    // initData.subCmd = "ROOMS";
    // initData.rooms = arr;
    // ws.send(JSON.stringify(initData));
//****************************************
    // foreach(let key in messageArr){
    //     // if(key === "notoken"){
    //     //     console.log("notoken");
    //     // }
    // }
    // if(data.to&&socketArray[data.to]){
    //     socketArray[data.to].send(JSON.stringify(data.content))
    // }
    // ws.send(JSON.stringify({
    //     content:[data.content],
    //     me:true,
    //     cmd:'MESSAGE'
    // }));
    //let messageArr=message.toString().split(" ");
    //console.log("received:"+message.toString());
}

module.exports = {
    token: handleToken,

}
