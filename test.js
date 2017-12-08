const http=require("http");
var tokens = require("./token");
var dbMethod = require("./dbMethod");
var db = require("./db");
var User = db.User;
http.createServer(function(request,response){
    var query={'realname':"supange"};
    function handleDoc(doc){
        response.writeHead(200,{"Content-Type":"text/plain;"});
        response.write(JSON.toString(doc.pwd));
        response.end();
        console.log("find doc");
        console.log(doc.pwd);
    }
    dbMethod.findDocs(User, query,handleDoc);
}).listen(8000)
