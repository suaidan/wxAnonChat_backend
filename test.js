const http=require("http");
var dbMethod = require("./dbMethod");
var db = require("./db");
var User = db.User;
var Token=require("./token");
var token=Token.generateToken("superhero","123",true);
var result=Token.verifyToken("superhero",token);
console.log(result);
http.createServer(function(request,response){
    var query={'id':"100"};
    User.find(query,function(err,res){
        if(res)console.log("res:"+res);
        if(err)console.log("err:"+err);
        response.writeHead(200,{"Content-Type":"text/plain;"});
        response.write("err");
        response.end();
    });
}).listen(8000)
