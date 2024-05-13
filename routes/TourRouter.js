const express = require('express');
const multer = require('multer');
const TourController = require('../controllers/TourController');
const TourDetailController = require ('../controllers/TourDetailController')
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ dest: 'uploads/' });

router.post('/add', upload.single('image_tour'), TourController.addTour);
router.get("/list", TourController.getTours);
router.delete('/delete/:id', TourController.deleteTour);
router.put('/update/:id', upload.single('image_tour'), TourController.updateTour);
router.get("/count", TourController.countTours);
router.get('/detail/:id_tour', TourController.getTourById);

router.post("/adddetail", TourDetailController.addTourDetail);
router.get("/listdetail", TourDetailController.getTourDetails);
router.put('/updatedetail/:tour_id', TourDetailController.updateTourDetail);
router.delete('/deletedetail/:tour_id', TourDetailController.deleteTourDetail);

module.exports = router;
