const RoomRepository = require('../repository/mysql2/RoomRepository');

exports.getRooms = (req, res, next) => {
    RoomRepository.getRooms()
        .then(rooms => {
            res.status(200).json(rooms);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getRoomById = (req, res, next) => {
    const room_id = req.params.room_id;
    RoomRepository.getRoomById(room_id)
        .then(room => {
            if(!room) {
                res.status(404).json({
                    message: 'Room with id: '+room_id+' not found'
                })
            } else {
                res.status(200).json(room);
            }
        });
};

exports.createRoom = (req, res, next) => {
    RoomRepository.createRoom(req.body)
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

exports.updateRoom = (req, res, next) => {
    const room_id = req.params.room_id;
    RoomRepository.updateRoom(room_id, req.body)
        .then(result => {
           res.status(200).json({message: 'Room updated!', room: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};


exports.deleteRoom = (req, res, next) => {
    const room_id = req.params.room_id;
    RoomRepository.deleteRoom(room_id)
        .then(result => {
            res.status(200).json({message: 'Removed room', room: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};