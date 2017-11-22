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
        console.log("mongodb disconnected")
    })
var Schema = mongoose.Schema;
// 存放用户数据
var user = new Schema({
    username : {type:String},
    realname:{type:String},
    pwd : {type:String},
    id:{type:Number,index:true},
    status : {type:String, default:"offline"},
    profile:{type:String},
    avatar : {type:String}//存放路径
});
//存放聊天内容
var content = new Schema({
    userId : {type:Number,index:true},
    to:{type:String},//存放发给谁的
    text : {type:String},
    img : {type:String},//存放路径
    time : {type:Date, default:new Date()},
    readed : {type:Boolean, default:false}
});
//存放用户消息列表
var rooms = new Schema({
    list : {type:Object},
    userId : {type:Number,index : true}
})
module.exports = {
    mongoose : mongoose,
    User : new db.model("User",user),
    Content : new db.model("Content",content),
    Rooms : new db.model("Rooms",rooms)
};