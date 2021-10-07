const RoomRepository = require('../repository/mysql2/RoomRepository');


exports.showRoomList = (req, res, next) => {
    RoomRepository.getRooms()
        .then(rooms => {
            res.render('rooms/rooms', {
                rooms: rooms,
                navLocation: 'room'
            });
        });
}
exports.showAddRoomForm = (req, res, next) => {
    res.render('rooms/rooms-form', {
        room: {},
        pageTitle: 'Nowy pokój',
        formMode: 'createNew',
        btnLabel: 'Dodaj pokój',
        formAction: '/rooms/add',
        navLocation: 'room',
        validationErrors: []

    });
}
exports.showRoomDetails = (req, res, next) => {
	const room_id = req.params.room_id;
    RoomRepository.getRoomById(room_id)
        .then(room => {
    res.render('rooms/rooms-details', {
    			room: room,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły pokoju',
                formAction: '',
                navLocation: 'room',
                validationErrors: []
    			});
     });
}
exports.showEditRoomForm = (req, res, next) => {
    const room_id = req.params.room_id;
    RoomRepository.getRoomById(room_id)
        .then(room => {
            res.render('rooms/rooms-details', {
                room: room,
                formMode: 'edit',
                pageTitle: 'Edycja pokoju',
                btnLabel: 'Edytuj pokój',
                formAction: '/rooms/edit',
                navLocation: 'room',
                validationErrors: []
            });
        });
}
exports.addRoom = (req, res, next) => {
	roomData = { ...req.body };
    RoomRepository.createRoom(roomData)
        .then( result => {
            res.redirect('/rooms');
        }).catch(err => {
                    console.log(err.details);

            res.render('rooms/rooms-form', {
                room: roomData,
                pageTitle: 'Dodawanie pokoju',
                formMode: 'createNew',
                btnLabel: 'Dodaj pokój',
                formAction: '/rooms/add',
                navLocation: 'room',
                validationErrors: err.details
            });
        });
};


exports.updateRoom = (req, res, next) => {
    const room_id = req.body._id;
    const roomData = { ...req.body };
    RoomRepository.updateRoom(room_id, roomData)
    .then( result => {
        res.redirect('/rooms');
    }).catch(err => {
        console.log(err.details);
        console.log(roomData);
            res.render('rooms/rooms-details', {
                room: roomData,
                pageTitle: 'Edycja gościa',
                formMode: 'updateRoom',
                btnLabel: 'Edytuj gościa',
                formAction: '/rooms/edit',
                navLocation: 'room',
                validationErrors: err.details
            });
        });
};

exports.deleteRoom = (req, res, next) => {
	const room_id = req.params.room_id;
	RoomRepository.deleteRoom(room_id)
    .then( () => {
        res.redirect('/rooms');
    });
};