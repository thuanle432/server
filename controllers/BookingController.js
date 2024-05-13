const pool = require('../config/Database');

exports.saveBooking = (req, res) => {
    const { id_account, formData, tourId, name_tour, price, itinerary, includes, excludes } = req.body;
    const status = formData.status || 1; 

    console.log("Received status:", status); 

    const query = `
        INSERT INTO bookings (id_account, id_tour, name, email, phone_number, people, date, name_tour, price, itinerary, includes, excludes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        name = VALUES(name), email = VALUES(email), phone_number = VALUES(phone_number),
        people = VALUES(people), date = VALUES(date), name_tour = VALUES(name_tour),
        price = VALUES(price), itinerary = VALUES(itinerary), includes = VALUES(includes),
        excludes = VALUES(excludes), status = VALUES(status);
    `;

    pool.query(query, [id_account, tourId, formData.name, formData.email, formData.phoneNumber, formData.people, formData.date, name_tour, price, itinerary, includes, excludes, status], (err, results) => {
        if (err) {
            console.error('Failed to save or update booking:', err);
            return res.status(500).send('Error saving booking data');
        }
        res.send('Booking data saved successfully');
    });
};

exports.getBookingsByUser = (req, res) => {
    const { id_account } = req.params;

    const query = `
        SELECT * FROM bookings WHERE id_account = ?;
    `;

    pool.query(query, [id_account], (err, results) => {
        if (err) {
            console.error('Failed to retrieve booking details:', err);
            res.status(500).send('Error fetching booking details');
            return;
        }
        res.json(results);
    });
};

exports.updateBooking = (req, res) => {
    const { id_account } = req.params;
    const { status } = req.body;

    const query = `
        UPDATE bookings
        SET status = ?
        WHERE id_account = ?;
    `;

    pool.query(query, [status, id_account], (err, results) => {
        if (err) {
            console.error('Failed to update booking status:', err);
            return res.status(500).send('Error updating booking status');
        }
        console.log('Booking status updated successfully to', status);
        res.send('Booking status updated successfully');
    });
};

exports.getListBookingByStatus = (req, res) => {
    const query = "SELECT * FROM bookings WHERE status = 2;"
    
    pool.query(query, (err, results) => {
        if(err){
            console.log("Faild get list bookings by status", err);
            res.status(500).send("Error fetching bookings");
            return;
        }
        res.json(results);
    })
}

exports.successBooking = (req, res) => {
    const {id_account} = req.params;
    const {status} = req.body;

    const query =  `
        UPDATE bookings 
        SET status = ?
        WHERE id_account = ?;
    `

    pool.query(query, [status,id_account], (err, results) => {
        if(err){
            console.error("Faild update success booking", err);
            return res.status(500).send("Error success booking status");
        }
        console.log("Success booking status successfully", status);
        res.send("Success booking status successfully")
    })
}

exports.getSuccessBookingByStatus = (req, res) => {
    const query = "SELECT * FROM bookings WHERE status = 3;"

    pool.query(query, (err, results) => {
        if(err){
            console.log("Faild get list bookings by status", err);
            res.status(500).send("Error fetching bookings");
            return;
        }
        res.json(results);
    })
}

exports.checkAvailability = (req, res) => {
    const { id_tour, date } = req.params;

    const getTourDetails = `SELECT day, quantity FROM tour WHERE id_tour = ?`;
    pool.query(getTourDetails, [id_tour], (err, tourResults) => {
        if (err) {
            console.error('Error fetching tour details:', err);
            return res.status(500).send('Server error while fetching tour details');
        }
        if (tourResults.length === 0) {
            return res.status(404).send('Tour not found');
        }

        const tourDuration = parseInt(tourResults[0].day);
        const maxQuantity = parseInt(tourResults[0].quantity);
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + tourDuration - 1);

        const checkOverlapBookings = `
            SELECT DISTINCT id_account FROM bookings
            JOIN tour ON bookings.id_tour = tour.id_tour
            WHERE bookings.id_tour = ? AND ((DATE(bookings.date) <= ? AND DATE(DATE_ADD(bookings.date, INTERVAL (tour.day) DAY)) >= ?) OR
                                            (DATE(DATE_ADD(bookings.date, INTERVAL (tour.day) DAY)) BETWEEN ? AND ?))
        `;
        pool.query(checkOverlapBookings, [id_tour, endDate, startDate, startDate, endDate], (err, bookings) => {
            if (err) {
                console.error('Error checking for overlapping bookings:', err);
                return res.status(500).send('Server error while checking for overlapping bookings');
            }

            const uniqueAccounts = new Set();
            bookings.forEach(booking => {
                uniqueAccounts.add(booking.id_account);
            });

            const isAvailable = uniqueAccounts.size < maxQuantity;
            res.json({ isAvailable });
        });
    });
};
