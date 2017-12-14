const monObj = require("./db");
var mon = monObj.mongoose;
var userCounter = 0;

// ***********************插入操作*******************************
function insertUser(name, realname, pwd, status, avatar, profile) {
    var user = new monObj.User({
        username: name,
        realname: realname,
        id: ++userCounter,
        pwd: pwd,
        status: status,
        avator: avatar,
        profile: profile
    });
    user.save(function (err, res) {
        if (err) {
            console.error(err)
        } else {
            console.log(res)
        }
    })
}

function insertContent(id, to, text, img, time, readed) {
    var content = new monObj.Content({
        userId: id,
        text: text,
        to: to,
        img: img,
        time: time,
        readed: readed
    });
    content.save(function (err, res) {
        if (err) {
            console.error(err)
        } else {
            console.log(res)
        }
    })
}

function insertRooms(list, id) {
    var rooms = new monObj.Rooms({
        list: list,
        userId: id
    })
    rooms.save(function (err, res) {
        if (err) {
            console.error(err + " susu")
        } else {
            console.log(res)
        }
    })
}

// ***************************查询操作*********************************************
function findDoc(moduleName, query, callback) {

    moduleName.find(query, function (err, doc) {
        var result = {};
        if (err) {
            console.log("db error:" + err);
            result.msg="err";
            result.data=err;
        } else {
            console.log("db doc:" + doc);
            result.msg="suc";
            result.data=doc;
        }
        callback(result);
    })
}

// ********************************更新模块*************************************************
/**
 * 更新模块
 * @param moduleName model的名字
 * @param query 查询字符串
 * @param updateOpt 要更新的选项和内容，如{pwd:xxxxx}
 */
function update(moduleName, query, updateOpt,callback) {
    moduleName.update(query, updateOpt, function (err, doc) {
        let result={};
        if (err) {
            result.msg="err";
            result.data=err;
            console.log(err)
        } else {
            result.msg="suc";
            result.data=doc;
            console.log(doc);
        }
        callback(result);
    })
}

// ******************************删除模块*************************************************
function remove(moduleName, query) {
    moduleName.remove(query, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            console.log(res)
        }
    })
}

// ******************************数量查询*************************************************
function count(moduleName, query) {
    moduleName.count(query, function (err, count) {
        if (err) {
            console.error(err)
        } else {
            return count
        }
    })
}

// ******************************开放模块*************************************************
module.exports = {
    'insertUser': insertUser,
    'insertContent': insertContent,
    'insertRooms': insertRooms,
    'findDoc': findDoc,
    'update': update,
    'count': count,
    'remove': remove,
    'mon': mon
}

