const { body, param, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const getUserInfo = async (req, res) => {
    //req.auth.id是jwt中间件解析出来的用户id
    const userInfo = await userModel.getPartUserById(req.auth.id)
    if (userInfo.length && userInfo.length!==1 ) res.messageInfo("获取用户信息失败");
    res.send({
        code: 0,
        message: '获取用户基本信息成功',
        data: userInfo[0]
    })
}

const updateUserInfo = async (req, res) => {
    const results = validationResult(req);
    //验证有错误，返回错误信息
    if(!results.isEmpty()) {
        return res.messageInfo(results.array()[0]["msg"]);
    }
    //更新操作
    const updateResult = await userModel.updateUser(req.body, req.auth.id);
    if(updateResult!=1) return res.messageInfo("更新用户信息失败")
    //更新用户信息之后重新生成token
    const token = jwt.sign(
        {id: req.auth.id, username: req.body.username}, // 载荷，包含用户ID和用户名
        process.env.JWT_SECRET, // 使用环境变量中的密钥
        { expiresIn: process.env.JWT_EXPIRES_IN } // 设置过期时间为1小时
    );
    res.send({
        code: 0,
        message: '更新成功',
        token: token // 返回新的token
    })
}
const updateUserPassword = async (req, res) => {
    //密码验证(优化可以做关于密码的规则验证)
    if(req.body.old_pwd === req.body.new_pwd) return res.messageInfo("旧密码不能和新密码相同")
    if(req.body.new_pwd !== req.body.re_pwd) return res.messageInfo("两次输入的密码不一致")
        
    const user = await userModel.getUserById(req.auth.id);
    if (!user) {
        return res.messageInfo("用户不存在")
    }
    const isOldPasswordValid = await bcrypt.compare(req.body.new_pwd, user.password);
    if(isOldPasswordValid) return res.messageInfo("新密码不能和旧密码相同")
    const isPasswordValid = await bcrypt.compare(req.body.old_pwd, user.password);
    if(!isPasswordValid){
        return res.messageInfo("密码错误")
    }

    //更新操作
    const hash_password = await bcrypt.hash(req.body.new_pwd, 10);
    const updateResult = await userModel.updateUser({
        'password': hash_password
    }, req.auth.id);

    if(updateResult!=1) return res.messageInfo("更新用户信息失败")
    res.send({
        code: 0,
        message: '密码更新成功',
    })
}
//更换用户头像
const updateUserAvatar = async (req, res) => {
    const results = validationResult(req);
    //验证有错误，返回错误信息
    if(!results.isEmpty()) {
        return res.messageInfo(results.array()[0]["msg"]);
    }
    //更新操作
    const updateResult = await userModel.updateUser({
        'user_pic': req.body.user_pic
    }, req.auth.id);
    if(updateResult!=1) return res.messageInfo("更新头像失败")
    res.send({
        code: 0,
        message: '更新成功',
    })
}

module.exports = {
    getUserInfo,
    updateUserInfo,
    updateUserPassword,
    updateUserAvatar
};
