const { body, param, validationResult } = require('express-validator');
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
        res.messageInfo(results.array()[0]["msg"]);
    }
    //更新操作
    const updateResult = await userModel.updateUser(req.body, req.auth.id);
    if(updateResult!=1) res.messageInfo("更新用户信息失败")

    res.status(200).json({
        "code": 0,
        "message": "更新成功"
    });
}

module.exports = {
    getUserInfo,
    updateUserInfo
};
