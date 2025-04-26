const pool = require('../config/db');

//获取全部分类
const getAllArtCats = async () => {
    const [rows] = await pool.query('select id,name,alias from ev_article_cate where is_delete=0')
    return rows;
}   
//增加分类
const AddArtCat = async (name, alias) => {
    const [result] = await pool.query('insert into ev_article_cate (name, alias, is_delete) VALUES (?,?,?)',[name,alias,0])
    return result.insertId; 
} 
//根据name查询分类
const getArtCatByName = async(name, alias) => {
    const [result] = await pool.query('select id,name,alias from ev_article_cate where (name=? or alias=?) and  is_delete=0',[name, alias])
    return result
}

module.exports = {
    getAllArtCats,
    AddArtCat,
    getArtCatByName
}