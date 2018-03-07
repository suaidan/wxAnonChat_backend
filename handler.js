/**
 * Created by 一苏 on 2018/1/21.
 * statement:对不同的请求做出反应的具体实现，以后要增加先解析请求内容，在相应处理。
 * 目前处理的是静态文件
 */
let fs = require("fs");
let mime = require("mime");
//缓存常用的信息
let filecontents = {};

function sendFile(httpCode, response, data, contentType) {
    response.writeHead(httpCode, {"Content-type": contentType});
    response.write(data);
    response.end();
}
function SendFile(response,path){
    if(filecontents[path]!==void(0)){//如果文件已经在缓存中
        sendFile(200,response,mime.lookup(path));
        return;
    }
    fs.readFile(path,function(err,data){
        if(err){
            if(err.code==="ENOENT"){
                console.error(path+"文件不存在");
            }
            sendFile(400,response,"Living is a process",{"Content-type": "text/plain"});
        }else{
            sendFile(200,response,data.toString(),mime.lookup(path));
            filecontents[path]=data.toString();
        }

    })
}
/**
 *初始界面
 * @param response
 */
function start(response) {
    SendFile(response,"./start.html");
    //如果文件已经在缓存中
    // if (filecontents.start !== void(0)) {
    //     sendFile(200,response,filecontents.start,mime.lookup("./start.html"))
    //     return;
    // }
    // fs.readFile("./start.html", function (err, data) {
    //     if (err) {
    //         console.log("read file error");
    //         if (err.code === "ENOENT") {
    //             console.log("D:\\project\\wxChatNode\\wxAnonChat_backend\\start.html 不存在");
    //         }
    //         sendFile(400,response,"Living is a process",{"Content-type": "text/plain"})
    //         // response.writeHead(200, {"Content-type": "text/plain"});
    //         // response.write("Living is a process");
    //         // response.end();
    //     } else {
    //         //console.log(data.toString());
    //         sendFile(200,response,data.toString(),mime.lookup("./start.html"));
    //         filecontents.start=data.toString();
    //         // response.writeHead(200, {"Content-Type": "text/html"});
    //         // response.write(data.toString());
    //         // response.end();
    //     }
    // })

}

/**
 * 胡乱写的
 * @param response
 */
function upLife(response) {
    if(filecontents.uplife!==void(0)){
        sendFile(200,response,filecontents.uplife)
    }
    sendFile(200,response,"keep moving",{"Content-Type": "text-plain"});

    // response.writeHead(200, {"Content-Type": "text-plain"});
    // response.write("keep moving");
    // response.end();
}

let handler = {
    start: start,
    uplife: upLife
}
module.exports = handler;