/***
 * 这个函数相当于路由，将不同type的数据交给不同的处理函数
 * @param message 小程序发送的消息
 * @param resdata 要返回的消息
 */
function analyse(message,resdata){
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

}
