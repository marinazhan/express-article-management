const express = require('express')
const userInfoController = require('../controllers/userInfoController')
const { body, param, validationResult } = require('express-validator');
const router = express.Router()

//获取用户基本信息
router.get('/userInfo', userInfoController.getUserInfo)
//更新用户基本信息
router.post('/userInfo', body('email').isEmail().withMessage('邮箱格式不正确').normalizeEmail(),
    body('username').trim().notEmpty().withMessage('名称不能为空').isString().withMessage('名称必须是字符串')
    .isLength({ max: 50 }).withMessage('名称不能超过50个字符'),
    userInfoController.updateUserInfo)
//重置密码
router.post('/updatepwd',userInfoController.updateUserPassword)
//更换用户头像
router.post('/avatar',body('user_pic').trim().notEmpty().withMessage('名称不能为空'),userInfoController.updateUserAvatar)

module.exports = router