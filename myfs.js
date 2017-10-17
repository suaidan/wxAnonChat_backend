var fs = require("fs");
fs.readFile("test.txt", function(err, data){
    if(err){
        console.error(err)
    }
    console.log("异步读取"+data);
    fs.writeFile("test2.txt", data, function(err){
        if(err){
            console.error(err)
        }
    })
})
fs.stat("test.txt",function(err, stats){
    if(err){
        console.error(err)
    }
    console.log(stats.isFile())
})
fs.open("test2.txt", "r+", function(err,fd){
    if(err){
        console.error(err);
    }
    console.log("fd信息："+fd);
    fs.close(fd,function(err){
       if(err){
        console.error(err);
    }
    })
})
// fs.mkdir("susu",function (err){
//    if(err){
//         console.error(err);
//     }
// })
// *********************************************
// fs.rmdir("susu",function (err){
//     if(err){
//         console.log(err)
//     }
// })
// **********************************************
// fs.readdir("spg",function(err,files){
//     if(err){
//         console.error(err);
//     }
//     console.log(files)
// })
// ***************************************
fs.rename("test2.txt","super.txt",function(err){
    if(err){
        console.error(err);
    }
})