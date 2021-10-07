const GuestRepository = require('../repository/mysql2/GuestRepository');

exports.getGuests = (req, res, next) => {
    GuestRepository.getGuests()
        .then(guests => {
            res.status(200).json(guests);
        })
        .catch(err => {
           console.log(err);
        });
};


exports.getGuestById = (req, res, next) => {
    const guest_id = req.params.guest_id;
    GuestRepository.getGuestById(guest_id)
        .then(guest => {
            if(!guest) {
                res.status(404).json({
                    message: 'Guest with id: '+guest_id+' not found'
                })
            } else {
                res.status(200).json(guest);
            }
        });
};

exports.createGuest = (req, res, next) => {
    GuestRepository.createGuest(req.body)
        .then(newObj => {
           res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateGuest = (req, res, next) => {
    const guest_id = req.params.guest_id;
    GuestRepository.updateGuest(guest_id, req.body)
        .then(result => {
           res.status(200).json({message: 'Guest updated!', guest: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteGuest = (req, res, next) => {
    const guest_id = req.params.guest_id;
    GuestRepository.deleteGuest(guest_id)
        .then(result => {
            res.status(200).json({message: 'Removed guest', guest: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};