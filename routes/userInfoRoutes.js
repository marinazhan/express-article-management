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

module.exports = router