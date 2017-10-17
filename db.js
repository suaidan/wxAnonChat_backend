var mongoose = require("mongoose");
    var dbURL = "mongodb://localhost:27017/chatApp";
var db = mongoose.connect(dbURL);
    mongoose.connection.on("connected",function(){
        console.log("connect to "+dbURL)
    })
    mongoose.connection.on("error",function(err){
        console.error("connect error: "+err)
    })
    mongoose.connection.on("disconnected",function(){
        console.log("disconnected")
    })
var Schema = mongoose.Schema;
// 存放用户数据
var user = new Schema({
    username : {type:String,index:true},
    pwd : {type:String},
    status : {type:String, default:"offline"},
    profile:{type:String},
    avatar : {type:String}//存放路径
});
//存放聊天内容
var content = new Schema({
    username : {type:String,index:true},
    to:{type:String},
    text : {type:String},
    img : {type:String},//存放路径
    time : {type:Date, default:new Date()},
    readed : {type:Boolean, default:false}
});
//存放用户消息列表
var rooms = new Schema({
    list : {type:Object},
    username : {type:String,index : true}
})
module.exports = {
    mongoose : mongoose,
    User : new db.model("User",user),
    Content : new db.model("Content",content),
    Rooms : new db.model("Rooms",rooms)
};