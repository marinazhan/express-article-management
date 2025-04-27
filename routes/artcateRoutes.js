const express = require('express')
const router = express.Router()
const artcatController = require('../controllers/artcatController')
const { body, param, validationResult } = require('express-validator');

//获取全部分类
router.get('/list', artcatController.getAllArtCats)
//新增文章分类
router.post('/add', body('cate_name').trim().notEmpty().withMessage('分类名称不能为空').isString().withMessage('名称必须是字符串')
.isLength({ max: 50 }).withMessage('名称不能超过50个字符'),
body('cate_alias').trim().notEmpty().withMessage('分类别名不能为空').isString().withMessage('分类别名必须是字符串')
.isLength({ max: 50 }).withMessage('分类别名不能超过50个字符'),artcatController.addArtCats)
//删除文章分类
router.delete('/del',body('id').notEmpty().withMessage('分类id不能为空')
.isInt({min:1}).withMessage('分类id格式不对'),artcatController.delArtCats)
 
module.exports = router