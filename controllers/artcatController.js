const { body, param, validationResult } = require('express-validator');
const artcatModel = require('../models/artcatModel');

//获取全部分类
const getAllArtCats = async(req, res) => {
    const results = await artcatModel.getAllArtCats();
    if(results.length<=0) return res.messageInfo('获取分类数据错误')
    res.send({
        code: 0,
        message: '获取文章分类列表成功',
        data: results
    })
}
//增加分类
const addArtCats = async(req, res) => {
    const results = validationResult(req);
    //验证有错误，返回错误信息
    if(!results.isEmpty()) {
        return res.messageInfo(results.array()[0]["msg"]);
    }
    //根据分类名称查询数据库，如果已经有分类，则不能增加
    const is_artcat = await artcatModel.getArtCatByName(req.body.cate_name,req.body.cate_alias)
    if(is_artcat.length>0){
        return res.messageInfo("分类名或别名已存在")
    }
    const artcatID = await artcatModel.AddArtCat(req.body.cate_name,req.body.cate_alias);
    
    if(!artcatID) {
        return res.messageInfo("增加分类失败")
    }
    res.status(200).json({
        "code": 0,
        "message": "新增文章分类成功"
    });
}

module.exports = {
    getAllArtCats,
    addArtCats
}