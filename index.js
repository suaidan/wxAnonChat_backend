/**
 * Created by 一苏 on 2018/1/18.
 * statement:
 */
let start=require("./app.js").start;
let router=require("./router.js").route;
portNum=8000;
start(router,8000,handler);