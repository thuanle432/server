const pool = require('../config/Database');
exports.addTourDetail = (req, res) => {
    const { description, highlights, itinerary, includes, excludes } = req.body;
    const insertSql = 'INSERT INTO detail (description, highlights, itinerary, includes, excludes) VALUES (?, ?, ?, ?, ?)';
    pool.query(insertSql, [description, highlights, itinerary, includes, excludes], (error, results) => {
        if (error) {
            console.error('Insert tour detail failed:', error);
            return res.status(500).json({ error: 'Database operation failed', details: error.message });
        }
        res.status(201).json({ message: 'Tour detail added successfully', detailId: results.insertId });
    });
};

exports.getTourDetails = (req, res) => {
    const query = 'SELECT * FROM detail';
    pool.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
};

exports.updateTourDetail = (req, res) => {
    const { tour_id } = req.params;
    const { description, highlights, itinerary, includes, excludes } = req.body;

    const updateSql = `UPDATE detail SET description = ?, highlights = ?, itinerary = ?, includes = ?, excludes = ? WHERE tour_id = ?`;

    pool.query(updateSql, [description, highlights, itinerary, includes, excludes, tour_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Tour detail not found' });
        }
        res.status(200).json({ message: 'Tour detail updated successfully' });
    });
};

exports.deleteTourDetail = (req, res) => {
    const { tour_id } = req.params;
    const deleteSql = 'DELETE FROM detail WHERE tour_id = ?';

    pool.query(deleteSql, [tour_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Tour detail not found' });
        }
        res.status(200).json({ message: 'Tour detail deleted successfully' });
    });
};
