const express = require('express');
const router = express.Router();

const guestApiController = require('../../api/GuestAPI');

router.get('/', guestApiController.getGuests);
router.get('/:guest_id', guestApiController.getGuestById);
router.post('/', guestApiController.createGuest);
router.put('/:guest_id', guestApiController.updateGuest);
router.delete('/:guest_id', guestApiController.deleteGuest);

module.exports = router;