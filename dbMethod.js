const monObj = require("./db");
var mon = monObj.mongoose;
// ***********************插入操作*******************************
function insertUser( name, pwd, status, avatar, profile){
    var user =  new monObj.User({
        username:name,
        pwd : pwd,
        status : status,
        avator : avatar,
        profile : profile
    });
    user.save(function(err, res){
        if(err){
            console.error(err)
        }else{
            console.log(res)
        }
    })
}
function insertContent(name,to, text, img, time, readed){
    var content = new monObj.Content({
        username : name,
        text : text,
        to:to,
        img : img,
        time : time,
        readed : readed
    });
    content.save(function(err,res){
        if(err){
            console.error(err)
        }else{
            console.log(res)
        }
    })
}
function insertRooms(list, name){
    var rooms = new monObj.Rooms({
        list : list,
        username : name
    })
    rooms.save(function(err, res){
        if(err){
            console.error(err+" susu")
        }else{
            console.log(res)
        }
    })
}
// ***************************查询操作*********************************************
function findDoc(moduleName, query){
    moduleName.find(query, function(err, doc){
        if(err){
            console.log(err)
        }else{
            console.log(doc)
            return doc
        }
    })
}
// ********************************更新模块*************************************************
function update(moduleName, query, updateOpt){
    moduleName.update(query, updateOpt, function(err,doc){
        if(err){
            console.log(err)
        }else{
            console.log(doc)
        }
    })
}
// ******************************删除模块*************************************************
function remove(moduleName, query){
    moduleName.remove(query, function(err, res){
        if(err){
            console.log(err)
        }else{
            console.log(res)
        }
    })
}
// ******************************数量查询*************************************************
function count(moduleName,query){
    moduleName.count(query,function(err,count){
        if(err){
            console.error(err)
        }else{
            return count
        }
    })
}
// ******************************开放模块*************************************************
module.exports = {
    insertUser : insertUser,
    insertContent : insertContent,
    insertRooms : insertRooms,
    mon : mon
}