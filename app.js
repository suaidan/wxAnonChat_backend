// HTTP 模块同时支持 Express 和 WebSocket
const http = require('http');
// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
// 引用 wafer-session 支持小程序会话
const waferSession = require('wafer-node-session');
// 使用 MongoDB 作为会话的存储
const MongoStore = require('connect-mongo')(waferSession);
// 引入配置文件
const config = require('./config');
// 引入 WebSocket 服务实现
const websocket = require('./websocket');
// 创建一个 express 实例
const app = express();

// 添加会话中间件，登录地址是 /login
const sessionMiddleware = waferSession({
    appId: config.appId,
    appSecret: config.appSecret,
    loginPath: '/login',
    store: new MongoStore({
        url: `mongodb://${config.mongoUser}:${config.mongoPass}@${config.mongoHost}:${config.mongoPort}/${config.mongoDb}`
    })
});
app.use(sessionMiddleware);

// 在路由 /me 下，输出会话里包含的用户信息
app.use('/me', (request, response, next) => {
    response.json(request.session ? request.session.userInfo : { noBody: true });
    if (request.session) {
        console.log(`Wafer session success with openId=${request.session.userInfo.openId}`);
    }
});
// 实现唯一的一个中间件，对于所有请求，都输出 "Response from express"
app.use((request, response, next) => {
    response.write('Response from express');
    response.end();
});

// 创建 HTTP Server 而不是直接使用 express 监听
const server = http.createServer(app);

// 让 WebSocket 服务在创建的 HTTP 服务器上监听
websocket.listen(server, sessionMiddleware);


// 启动 HTTP 服务
server.listen(config.serverPort);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${config.serverPort}`);