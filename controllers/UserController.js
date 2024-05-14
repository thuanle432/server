

const bcrypt = require('bcryptjs');
const pool = require('../config/Database');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const id_role = 3;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO account (username, password, id_role) VALUES (?, ?, ?)';
        pool.query(query, [username, hashedPassword, id_role], (error, results) => {
            if (error) {
              res.status(500).json({ message: 'Dữ liệu thất bại: ' + error.sqlMessage });
              return;
            }
            res.status(201).json({ message: 'Người dùng đăng ký thành công!', userId: results.insertId });
        });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi sever: ' + error.message });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const query = 'SELECT id_account, username, password, id_role FROM account WHERE username = ?';
        pool.query(query, [username], async (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Cơ sở dữ liệu thất bại: ' + error.sqlMessage });
                return;
            }
            
            if (results.length === 0) {
                res.status(401).json({ message: 'Không được đẻ trống' });
                return;
            }
            
            const user = results[0];
            const passwordIsValid = await bcrypt.compare(password, user.password);
            
            if (!passwordIsValid) {
                res.status(401).json({ message: 'Tên đăng nhập không được để trống' });
                return;
            }
            res.status(200).json({
                message: 'Đăng nhập thành công',
                userId: user.id_account,
                id_role: user.id_role
                });
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server : ' + error.message });
    }
};
