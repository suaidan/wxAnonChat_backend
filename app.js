/**
 * Created by 一苏 on 2018/1/18.
 * statement:
 */
let http = require("http");
let url = require("url");
let util = require("util");

/**
 * 启动服务器的方法
 * @param route 路由处理函数
 * @param portNum 监听的端口号
 * @param handler 对请求的处理
 */
function start(route,portNum,handler) {
    function onRequest(request, response) {//目前只能识别简单的不附带数据的请求，未对请求类型做出验证。
        let postContent="";
        let pathname =url.parse(request.url).pathname;
        request.setEncoding("utf-8");
        request.on("data",function(postChunk){
            postContent+=postChunk;
        })
        request.on("end",function(){
            route(pathname,response,handler,postContent);
        })
        route(pathname,response,handler);
    }
    http.createServer(onRequest).listen(portNum);
}
exports.start=start;