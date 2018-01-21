/**
 * Created by 一苏 on 2018/1/18.
 * statement:路由函数
 */
function route(pathname,response,handler){
    if(typeof handler[pathname] === "function"){
        handler[pathname](response);
    }
    else{
        response.writeHead(404,{"Content-Type":"text/plain"});
        response.wrtie("好像这里什么也没有");
        response.end();
    }
}
exports.route=route;