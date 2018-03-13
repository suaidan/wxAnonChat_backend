/**
 * Created by 一苏 on 2018/1/18.
 * statement:服务器启动的入口
 */
const server=require("./app.js");
const router=require("./router.js").route;
const method=require("./handler.js");
const Analyse=require("./AnalyseMessage")
const ws=require("ws");
const wsHandler=require("./WebSocketHandler");
const portNum=8000;
const wsPortNum=8080;
//处理普通请求
let handler={};
handler["/"]=method.start;
handler["/start"]=method.start;
handler["/uplife"]=method.uplife;
server.start(router,portNum,handler);
//创建websocket链接
const wss=new ws.Server({port:wsPortNum});
wss.on("connection",function(ws){
    ws.on("message",function(message){
        console.log("message is :"+message)
        console.log("request data is:%s",JSON.parse(message).token);
        console.log("request name is:%s",JSON.parse(message).name);
        let data=JSON.parse(message);
        Analyse.AnalyseMsg(wsHandler,data,ws);
        console.log("response data is:%s",data.token);

    })
    ws.on("close",function(code){
        console.log("closed:"+code);
    })
})
wss.on("error",function(err){
    console.log(err);
})