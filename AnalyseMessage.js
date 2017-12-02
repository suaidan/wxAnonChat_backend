/***
 * 这个函数相当于路由，将不同type的数据交给不同的处理函数
 * @param message 小程序发送的消息
 * @param resdata 要返回的消息
 */
function analyse(handler,message,resdata){
    var reqdata=JSON.parse(message);
    switch(reqdata.type){
        case "token":
            handler.token(reqdata,resdata);
            break;
        case "chatContent": 
            handler.chatContent(reqdata,resdata);
            break;
        case "indexOnload":
            handler.indexlOnload(reqdata,resdata);
            break;
        default:
            break;
    }
<<<<<<< HEAD
=======
    //检验token
    if(data.token=="notoken"){//不存在token
        makeToken(false);
        return resData;
    }else if(data.token.length>0){
        //这里应该使用用户名和密码进行验证，但是具体形式还没想好
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
>>>>>>> a0e81b9df016b42018f4fa418d1a6db6b384c462

}
<<<<<<< HEAD
=======
module.exports={
    AnalyseMsg:analyseMessage
}
>>>>>>> a0e81b9df016b42018f4fa418d1a6db6b384c462
