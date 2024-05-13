const pool = require('../config/Database');


exports.addTour = async (req, res) => {
    const { name_tour, day, person, price, quantity, tour_id } = req.body;

    if (!name_tour || day <= 0 || person <= 0 || price <= 0 || quantity <= 0) {
        return res.status(400).send('All fields are required and must be valid numbers where applicable.');
    }

    if (!req.file) {
        return res.status(400).send('Image file is required.');
    }
    const image_tour = req.file.path;

    const insertQuery = 'INSERT INTO tour (name_tour, image_tour, day, person, price, quantity, tour_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    try {
        await pool.query(insertQuery, [name_tour, image_tour, day, person, price, quantity, tour_id]);
        res.send('Tour added successfully!');
    } catch (error) {
        console.error('Failed to add tour:', error);
        res.status(500).send('Failed to add the tour.');
    }
};

exports.getTours = async (req, res) => {
    const query = `
        SELECT t.*, d.description, d.highlights, d.itinerary, d.includes, d.excludes 
        FROM tour t
        LEFT JOIN detail d ON t.tour_id = d.tour_id;
    `;
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Failed to retrieve tours with descriptions:', err);
            return res.status(500).send('Error retrieving tours.');
        }
        res.json(results);
    });
};

exports.deleteTour = async (req, res) => {
    const { id } = req.params;
    const deleteQuery = 'DELETE FROM tour WHERE id_tour = ?';
    pool.query(deleteQuery, [id], (err, results) => {
        if (err) {
            console.error('Failed to delete tour:', err);
            return res.status(500).send('Failed to delete the tour');
        }
        res.send('Tour deleted successfully');
    });
};

exports.updateTour = async (req, res) => {
    const { id } = req.params;
    const { name_tour, day, person, price, quantity, tour_id } = req.body;

    if (!name_tour || day <= 0 || person <= 0 || price <= 0 || quantity <= 0) {
        return res.status(400).send('Invalid input: Please ensure all fields are correctly filled.');
    }
    const image_tour = req.file ? req.file.path : undefined;

    let query = 'UPDATE tour SET name_tour = ?, day = ?, person = ?, price = ?, quantity = ?';
    let params = [name_tour, day, person, price, quantity];

    if (image_tour) {
        query += ', image_tour = ?';
        params.push(image_tour);
    }

    if (tour_id) {
        query += ', tour_id = ?';
        params.push(tour_id);
    }

    params.push(id);
    query += ' WHERE id_tour = ?';

    try {
        const results = await pool.query(query, params);
        if (results.affectedRows === 0) {
            return res.status(404).send('Tour not found.');
        }
        res.send('Tour updated successfully.');
    } catch (error) {
        console.error('Error updating tour:', error);
        return res.status(500).send('Database error during the tour update.');
    }
};


exports.countTours = async (req, res) => {
    const query = 'SELECT COUNT(*) AS totalTours FROM tour';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching tour count:', err);
            return res.status(500).send('Failed to retrieve tour count');
        }
        console.log("Query results:", results);
        res.json({ totalTours: results[0].totalTours });
    });
};

exports.getTourById = (req, res) => {
    const { id_tour } = req.params;
    const query = `
        SELECT t.*, d.description, d.highlights, d.itinerary, d.includes, d.excludes
        FROM tour t
        LEFT JOIN detail d ON t.tour_id = d.tour_id
        WHERE t.id_tour = ?;
    `;

    pool.query(query, [id_tour], (err, results) => {
        if (err) {
            console.error('Error fetching tour details:', err);
            return res.status(500).send('Error retrieving the tour details');
        }
        if (results.length === 0) {
            return res.status(404).send('Tour not found');
        }
        res.json(results[0]);
    });
};

