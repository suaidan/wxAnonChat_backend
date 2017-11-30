var handler=require("./handleHelper");
//用来传递处理函数
var router={};
/***
 * 这个函数相当于路由，将不同type的数据交给不同的处理函数
 * @param message 小程序发送的消息
 * @param resdata 要返回的消息
 */
function analyse(message,resdata){
    var reqdata=JSON.parse(message);
    switch(reqdata.type){
        case "token":
            router["token"]=handler.token;
            router.token(reqdata,resdata);
            break;
        case "chatContent":
            router["chatContent"]=handler.chatContent;
            router.chatContent(reqdata,resdata);
            break;
        case "indexOnload":
            router.indexlOnload=handler.indexOnload;
            router.indexlOnload(reqdata,resdata);
            break;
        default:
            break;
    }

}
