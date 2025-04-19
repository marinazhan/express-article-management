const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//登录
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password)
    if(!username || !password) {
      return res.messageInfo("用户名或密码不能为空")
    }
    // 检查用户名是否存在
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.messageInfo("用户不存在")
    }
    //validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.messageInfo("密码错误")
    }
    //generate jwt token
    const token = jwt.sign(
      {id: user.id, username: user.username},
      process.env.JWT_SECRET, // 使用环境变量中的密钥
      { expiresIn: process.env.JWT_EXPIRES_IN } // 设置过期时间为1小时
    );
    //return token and user info
    res.json({
      "code": 0,
      "message": "登录成功",
      "data": 'Bearer ' + token
    });
  } catch (err) {
    next(err);
  }
};
//注册
const reg = async (req, res, next) => {
  try {
    const { username, password, repassword } = req.body;
    if(!username || !password || !repassword) {
      return res.messageInfo("用户名或密码不能为空")
    }
    if(password !==  repassword) {
      return res.messageInfo("两次密码不一致")
    }
    // 检查用户名是否已经存在
    const userExists = await userModel.getUserByUsername(username);
    if (userExists) {
      return res.messageInfo("用户名已经存在")
    }
    //validate password
    const userId = await userModel.createUser(username, password);
    if(!userId) {
      return res.messageInfo("注册失败")
    }
    res.status(200).json({
      "code": 0,
      "message": "注册成功"
    });
  } catch (err) {
    next(err);
  }
};
// 创建用户
const createUser = async (req, res, next) => {
    res.send('createUser')
//   try {
//     const { name, email } = req.body;
//     const newUserId = await userModel.createUser(name, email);
//     res.status(201).json({ id: newUserId, name, email });
//   } catch (err) {
//     next(err);
//   }
};

// 更新用户
const updateUser = async (req, res, next) => {
    res.send('updateUser')
//   try {
//     const { id } = req.params;
//     const { name, email } = req.body;
//     await userModel.updateUser(id, name, email);
//     res.status(200).json({ message: 'User updated' });
//   } catch (err) {
//     next(err);
//   }
};

// 删除用户
const deleteUser = async (req, res, next) => {
    res.send('deleteUser')
//   try {
//     const { id } = req.params;
//     await userModel.deleteUser(id);
//     res.status(204).send();
//   } catch (err) {
//     next(err);
//   }
};

module.exports = {
  login,
  reg,
  createUser,
  updateUser,
  deleteUser
};