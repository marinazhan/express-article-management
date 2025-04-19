const bcrypt = require('bcrypt');
const pool = require('../config/db');

// 根据用户名查询用户
const getUserByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username],(err, results) => {
    if (err) return res.messageInfo(err);
    if (results.length !==1 ) res.messageInfo("获取用户信息失败");
    return rows[0];
  });
  
};

// 根据ID查询用户
const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows;
};

// 创建用户
const createUser = async (username, password) => {
 
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    'INSERT INTO users (username, password, status) VALUES (?, ?, ?)',
    [username, hashedPassword, 1]
  );
  return result.insertId; // 返回新用户的ID
};

// 更新用户
const updateUser = async (id, name, email) => {
  await pool.query(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
  );
};

// 删除用户
const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByUsername
};