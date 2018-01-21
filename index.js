/**
 * Created by 一苏 on 2018/1/18.
 * statement:服务器启动的入口
 */
let server=require("./app.js");
let router=require("./router.js").route;
let handler=require("./handler.js")
const portNum=8000;
server.start(router,portNum,handler);