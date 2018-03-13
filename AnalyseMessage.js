/***
 * 这个函数相当于路由，将不同type的数据交给不同的处理函数
 * @param handler 处理方法
 * @param message 小程序发送的消息
 * @param ws 现在的对话启用的ws
 */
function analyse(handler, message,  ws) {
    let resdata={};
    let reqdata = JSON.parse(message);
    switch (reqdata.type) {
        case "token":
            handler.token(reqdata, resdata, ws);
            break;
        case "chatContent":
            handler.chatContent(reqdata, resdata, ws);
            break;
        case "indexOnload":
            handler.indexOnload(reqdata, resdata, ws);
            break;
        default:
            resdata = {
                data: "404 not found"
            }
            ws.send(JSON.stringify(resdata));
            break;
    }
}
module.exports = {
    AnalyseMsg: analyse
}