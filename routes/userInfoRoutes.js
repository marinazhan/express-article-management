const express = require('express')
const router = express.Router()
const userInfoController = require('../controllers/userInfoController')

//获取用户基本信息
router.get('/userInfo',userInfoController.getUserInfo)

module.exports = router