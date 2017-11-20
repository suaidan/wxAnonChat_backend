const url = require('url');
const ws = require('ws');//用来创建websocket
const fs = require('fs');//对系统文件及目录进行读写操作
const jwt=require('jsonwebtoken');
const express = require('express');
const http = require('http');
const https = require('https');
var privateKey  = fs.readFileSync('private.pem', 'utf8');
var certificate = fs.readFileSync('file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const app = express();
var server = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
var PORT = 8000;
var SSLPORT = 8766;
var socketArray = {};
const wss = new ws.Server({ server });
const dbMethod = require("./dbMethod");
// *************************http服务和https服务**********************************
// app.set('jwtTokenSecret','spg_is_handsome')
server.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
app.get('/', function(req, res) {
    if(req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    }
    else {
        res.status(200).send('Welcome!');
    }

});
app.post('/',function(req,res){
    if(req.protocol === 'https') {
        res.status(200).send('receive!');
        console.log(req)
    }
    else {
        res.status(200).send('Welcome!');
    }
})
var token=jwt.sign({
    iss:"supange"
},certificate,{expiresln:"30days"});
wss.on("connection",function(ws, resquest){
    console.log("connect socket");
    var arr = new Array({id:123,name:"supange",text:"smart",count:10,updated:"2017-1-12"},
      { id: 234, name: "spg",text: "smart", updated: "2017-1-12"},
      { id: 345, name: "zks",text: "smart", updated: "2017-1-12"})
    var initData = {};
    initData.cmd = "CMD";
    initData.subCmd = "ROOMS";
    initData.rooms = arr;
    ws.send(JSON.stringify(initData));
    ws.on("message",function(message){
        // var data = JSON.parse(message);
        socketArray[data.name] = ws;
        var messageArr=message.toString().split(" ");
        // foreach(var key in messageArr){
        //     // if(key === "notoken"){
        //     //     console.log("notoken");
        //     // }
        // }
        // if(data.to&&socketArray[data.to]){
        //     socketArray[data.to].send(JSON.stringify(data.content))
        // }
        // ws.send(JSON.stringify({
        //     content:[data.content],
        //     me:true,
        //     cmd:'MESSAGE'
        // }));
        console.log("received:"+message.toString());
    })
    ws.on("close",function(code){
        console.log("closed:"+code);
    })
})
wss.on("error",function(err){
    console.log(err)
})
// dbMethod.insertUser("susu","super","","c:\/\/node","win");
// dbMethod.insertUser("sususu","superHero","","c:\/\/node","wins");