const express = require('express');
const router = express.Router();

const roomApiController = require('../../api/RoomAPI');

router.get('/', roomApiController.getRooms);
router.get('/:room_id', roomApiController.getRoomById);
router.post('/', roomApiController.createRoom);
router.put('/:room_id', roomApiController.updateRoom);
router.delete('/:room_id', roomApiController.deleteRoom);

module.exports = router;