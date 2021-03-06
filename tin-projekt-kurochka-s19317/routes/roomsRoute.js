const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');
router.get('/', roomsController.showRoomList);
router.get('/add', roomsController.showAddRoomForm);
router.get('/edit/:room_id', roomsController.showEditRoomForm);
router.get('/details/:room_id', roomsController.showRoomDetails);
router.post('/add', roomsController.addRoom); 
router.post('/edit', roomsController.updateRoom);
router.get('/delete/:room_id', roomsController.deleteRoom);
module.exports = router;
