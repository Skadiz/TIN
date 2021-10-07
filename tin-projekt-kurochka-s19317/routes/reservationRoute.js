const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
router.get('/', reservationController.showReservationList);
router.get('/add', reservationController.showAddReservationForm);
router.get('/details/:reservationId', reservationController.showReservationDetails);
router.get('/edit/:reservationId', reservationController.showEditReservationList);
router.post('/add', reservationController.addReservation); 
router.post('/edit', reservationController.updateReservation);
router.get('/delete/:reservationId', reservationController.deleteReservation);
module.exports = router;