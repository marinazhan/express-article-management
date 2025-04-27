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
//根据id查询分类
const getArtCatById = async(id) => {
    const [result] = await pool.query('select id,name,alias from ev_article_cate where id=? and is_delete=0',[id])
    return result
}
//根据id删除分类，实际上是把is_delete改为1
const delArtCatById = async(id) => {
    const [result] = await pool.query('update ev_article_cate set is_delete=1 where id=?',[id])
    return result.affectedRows
}

module.exports = {
    getAllArtCats,
    AddArtCat,
    getArtCatByName,
    delArtCatById,
    getArtCatById
}