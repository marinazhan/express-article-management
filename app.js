require('dotenv').config(); // 引入dotenv模块以加载环境变量

const express = require('express');
const cors = require('cors');

// 2. 创建Express应用实例
const app = express();

const { expressjwt: jwt } = require("express-jwt");
const userRoutes = require('./routes/userRoutes');
const userInfoRoutes = require('./routes/userInfoRoutes');

// 3. 添加中间件（解析JSON和URL编码请求体）
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // 允许跨域请求

//响应错误数据的全局中间件(对错误信息返回数据的一个封装)
app.use((req, res, next) => {
  res.messageInfo = (err, code = 1, status = 200) => {//code默认为1，失败
    res.status(status)
    res.send({
      code,
      //err可能是一个错误对象，也有可能是一个字符串
      message : err instanceof Error ? err.message : err,
    })
  }
  next()
})
//路由之前，配置解析Token的中间件
// 除了这些路径，其他的URL都需要验证
app.use(jwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']}).unless({path: [/^\/api\//] })) 
//用户路由
app.use('/api', userRoutes);
app.use('/my', userInfoRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  if(err.name === 'UnauthorizedError') return res.messageInfo('身份认证失败, 无效的token',1 ,401)

  res.status(500).json({ error: 'Internal Server Error' });
});

// 5. 设置端口并启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});