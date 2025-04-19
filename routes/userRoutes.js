const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//用户登录
router.post('/login', userController.login);
//用户注册
router.post('/reg', userController.reg);

// // 创建用户
// router.post('/', userController.createUser);

// // 更新用户
// router.put('/:id', userController.updateUser);

// // 删除用户
// router.delete('/:id', userController.deleteUser);

module.exports = router;