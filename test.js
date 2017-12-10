const http=require("http");
var dbMethod = require("./dbMethod");
var db = require("./db");
var User = db.User;
http.createServer(function(request,response){
    // var user=new User({
    //     username:"spg",
    //     realname:"supange",
    //     id:1,
    //     pwd : "spg123",
    //     status : "online",
    //     avator : "",
    //     profile : ""
    // })
    // user.save(function(err,res){
    //     if(err)console.log("save err:"+err);
    //     if(res)console.log("res:"+res);
    // })
    var query={'id':"100"};
    // function handleDoc(doc){
    //     response.writeHead(200,{"Content-Type":"text/plain;"});
    //     response.write(JSON.toString(doc.pwd));
    //     response.end();
    //     console.log("find doc");
    //     console.log(doc.pwd);
    // }
    // dbMethod.findDocs(User, query,handleDoc);
    User.find(query,function(err,res){
        if(res)console.log("res:"+res);
        if(err)console.log("err:"+err);
        response.writeHead(200,{"Content-Type":"text/plain;"});
        //console.log("result:"+res[0].realname)
        response.write("err");
        response.end();
    });
   // var res= User.find();
   // console.log(typeof res.realname);
   //  response.writeHead(200,{"Content-Type":"text/plain;"});
   //  response.write("hahaha");
   //  response.end();
}).listen(8000)
