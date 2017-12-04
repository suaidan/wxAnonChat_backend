/**
 * Created by 一苏 on 2017/11/30.
 */
var tokens=require("./token");
var dbMethod=require("./dbMethod");
/**
 * 对客户端传进来的信息进行解析，返回一个对象
 * @param message 客户端传进来的信息，即reqdata
 */
function handleToken(message,resdata,ws) {
    var data=JSON.parse(message);
    var audience=data.name;
    var resData={name:audience};//返回的数据
    function makeToken(regis){
        resData.token=tokens.generateToken(audience,regis);
        resData.registered=regis;
    }
    //链接数据库
    var query={'name':audience}
    var doc=dbMethod.find(query);
    //检验token
    if(data.token=="notoken"){//不存在token
        makeToken(false);
        return resData;
    }else if(data.token.length>0){
        var verifyResult=tokens.verifyToken(audience,data.token);
        if(verifyResult.err){//token出错
            var err=verifyResult.err;
            if(err.message=="jwt expired"){//超时
                if(verifyResult.registered==false){
                    //token超时且用户未注册
                    makeToken(false);
                }
                if(verifyResult.registered==true){
                    //token超时且用户已注册
                    makeToken(true);
                }
            }else if(err.message="invalid token"){
                //伪造的token
                resData={reason:"token is invalid", token:""}
            }else{
                resData={reason:err,token:""}
            }
            console.log("token is wrong: %s",err);
        }else{//token正确
            console.log(verifyResult);
            if(verifyResult.registered){
                makeToken(true);//用户已经注册，延长token的有效期，从现在开始的30days。
            }else{
                makeToken(true);//resData.token=data.token;//token有效，但是为临时的，这里就不对token进行更改
            }

        }
    }
     //todo:需要进一步编写
    //用于平时进行对话
    // var arr = new Array({id:123,name:"supange",text:"smart",count:10,updated:"2017-1-12"},
    //   { id: 234, name: "spg",text: "smart", updated: "2017-1-12"},
    //   { id: 345, name: "zks",text: "smart", updated: "2017-1-12"})
    // var initData = {};
    // initData.cmd = "CMD";
    // initData.subCmd = "ROOMS";
    // initData.rooms = arr;
    // ws.send(JSON.stringify(initData));
//****************************************
    // foreach(var key in messageArr){
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
    //var messageArr=message.toString().split(" ");
    //console.log("received:"+message.toString());
    ws.send(JSON.toString(resData));
}
module.exports={
    token:handleToken
}
