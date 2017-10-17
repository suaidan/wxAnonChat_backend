var http = require("http");
var url = require("url");
var util = require("util");
function start(route){
    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname;
        console.log("当前路径"+pathname);
        route(pathname);
        response.writeHead(200,{"Content-Type":"text/plain"});
        var param = url.parse(request.url,true).query;
        response.write("webSiteName:"+param.name);
        response.write("\n"+"path:"+param.url)
        response.end(util.inspect(url.parse(request.url)));
        }
    http.createServer(onRequest).listen(8765);
    console.log("Server has started")
}
exports.start = start;