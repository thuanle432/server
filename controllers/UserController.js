

const bcrypt = require('bcrypt');
const pool = require('../config/Database');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const id_role = 3;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO account (username, password, id_role) VALUES (?, ?, ?)';
        pool.query(query, [username, hashedPassword, id_role], (error, results) => {
            if (error) {
              res.status(500).json({ message: 'Database error: ' + error.sqlMessage });
              return;
            }
            res.status(201).json({ message: 'User registered successfully!', userId: results.insertId });
        });
    } catch (error) {
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const query = 'SELECT id_account, username, password, id_role FROM account WHERE username = ?';
        pool.query(query, [username], async (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Database error: ' + error.sqlMessage });
                return;
            }
            
            if (results.length === 0) {
                res.status(401).json({ message: 'Invalid username or password' });
                return;
            }
            
            const user = results[0];
            const passwordIsValid = await bcrypt.compare(password, user.password);
            
            if (!passwordIsValid) {
                res.status(401).json({ message: 'Invalid username or password' });
                return;
            }
            res.status(200).json({
                message: 'User logged in successfully!',
                userId: user.id_account,
                id_role: user.id_role
                });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};
