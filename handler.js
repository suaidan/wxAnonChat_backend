/**
 * Created by 一苏 on 2018/1/21.
 * statement:对不同的请求做出反应的具体实现，以后要增加先解析请求内容，在相应处理。
 */
let fs=require("fs");
/**
 *初始界面
 * @param response
 */
function start(response){
    response.writeHead(200,{"Content-Type":"text-plain"});
    fs.readFileSync("start.html",function(err,data){
        if(err){
            response.writeHead(200,{"Content-type":"text/plain"});
            response.write("Living is a process");
        }else{
            console.log(data.toString());
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data.toString());
        }
    })
    response.end();
}

/**
 * 胡乱写的
 * @param response
 */
function upLife(response){
    response.writeHead(200,{"Content-Type":"text-plain"});
    response.write("keep moving");
    response.end();
}
let handler={
    start:start,
    uplife:upLife
}
module.exports=handler;