// routes/UserRouter.js

const express = require('express');
const UserController = require('../controllers/UserController');
const BookingController = require("../controllers/BookingController");
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.post('/savebooking', BookingController.saveBooking);
router.get('/inforbooking/:id_account', BookingController.getBookingsByUser);
router.patch('/updatebooking/:id_account', BookingController.updateBooking);
router.get('/listbookingstatus', BookingController.getListBookingByStatus);
router.patch('/successbooking/:id_account', BookingController.successBooking);
router.get('/listsuccessbooking', BookingController.getSuccessBookingByStatus);

router.get('/checkquantity/:id_tour/:date', BookingController.checkAvailability);
router.get('/checkexisting/:id_account', BookingController.checkExistingBooking);


module.exports = router;

