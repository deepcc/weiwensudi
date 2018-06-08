// const express = require('express');
// const timeout = require('connect-timeout');
// const proxy = require('http-proxy-middleware');
// const app = express();




// include dependencies
var express = require('express');
var proxy = require('http-proxy-middleware');

// proxy middleware options
var options = {
    target: 'http://111.231.225.172', // target host
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    // pathRewrite: {
    //     '^/api': '',     // rewrite path
    // },
    // router: {
    //     // when request.headers.host == 'dev.localhost:3000',
    //     // override target 'http://www.example.org' to 'http://localhost:8000'
    //     'dev.localhost:3000': 'http://localhost:8000'
    // }
};

// create the proxy (without context)
var exampleProxy = proxy(options);

// mount `exampleProxy` in web server
var app = express();
app.use('/api', exampleProxy);
console.log('http://localhost:8001')
app.listen(8001);
// 这里从环境变量读取配置，方便命令行启动
// HOST 指目标地址
// PORT 服务端口

// const { HOST = 'http://humanityerror.com', PORT = '80' } = process.env;

// // 超时时间
// const TIME_OUT = 30 * 1e3;

// // 设置端口
// app.set('port', PORT);

// 设置超时 返回超时响应
// app.use(timeout(TIME_OUT));
// app.use((req, res, next) => {
//     console.log(req);
//     if (!req.timedout){
//         next();
//     }
     
// });

// 静态页面
// 这里一般设置你的静态资源路径
// app.use('/', express.static('./'));

// // 反向代理（这里把需要进行反代的路径配置到这里即可）
// // eg:将/api/test 代理到 ${HOST}/api/test
// app.use(proxy('/', { target: HOST }));

// // 监听端口
// app.listen(app.get('port'), () => {
//     console.log(`server running @${app.get('port')}`);
// });