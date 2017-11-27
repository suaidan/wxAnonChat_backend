const url = require('url');
const ws = require('ws');//用来创建websocket
const fs = require('fs');//对系统文件及目录进行读写操作
const Analyse=require('./AnalyseMessage');
const express = require('express');
const http = require('http');
const https = require('https');
var privateKey  = fs.readFileSync('resource/private.pem', 'utf8');
var certificate = fs.readFileSync('resource/file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const app = express();
var server = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
var PORT = 8000;
var SSLPORT = 8766;
var socketArray = {};
const wss = new ws.Server({ server });
// const dbMethod = require("./dbMethod");
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
wss.on("connection",function(ws, resquest){
    console.log("connect socket");
    ws.on("message",function(message){
        console.log("message is :"+message)
        console.log("request data is:%s",JSON.parse(message).token);
        console.log("request name is:%s",JSON.parse(message).name);
        var data= Analyse.AnalyseMsg(message);
        console.log("response data is:%s",data.token);
        ws.send(JSON.stringify(data));
        socketArray[data.name] = ws;
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