const userModel = require('../models/userModel');

const  getUserInfo = async (req, res) => {
    //req.auth.id是jwt中间件解析出来的用户id
    const userInfo = await userModel.getUserById(req.auth.id)
    if (userInfo.length && userInfo.length !==1 ) res.messageInfo("获取用户信息失败");
    res.send({
        code: 0,
        message: '获取用户基本信息成功',
        data: userInfo[0]
    })
}
module.exports = {
    getUserInfo
};
