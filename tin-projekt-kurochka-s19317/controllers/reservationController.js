const ReservationRepository = require('../repository/mysql2/ReservationRepository');
const GuestRepository = require('../repository/mysql2/GuestRepository');
const RoomRepository = require('../repository/mysql2/RoomRepository');

exports.showReservationList = (req, res, next) => {
    ReservationRepository.getReservation()
        .then(reservations => {
            res.render('reservation/reservation', {
                reservations: reservations,
                navLocation: 'reservation'
            });
        }); 
}
exports.showAddReservationForm = (req, res, next) => {
     let allGuests, allRooms;
    GuestRepository.getGuests()
        .then(guests => {
            allGuests = guests;
            return RoomRepository.getRooms();
        })
        .then(rooms => {
            allRooms = rooms;
            res.render('reservation/reservation-form', {
                reservation: {},
                formMode: 'createNew',
                allGuests: allGuests,
                allRooms: allRooms,
                pageTitle: 'Nowa rezerwascja',
                btnLabel: 'Dodaj rezerwacje',
                formAction: '/reservation/add',
                navLocation: 'reservation',
                validationErrors: []
            });
        });
}
exports.showReservationDetails = (req, res, next) => {
    const reservation_id = req.params.reservationId ;
    let allGuests, allRooms;
    GuestRepository.getGuests()
        .then(guests => {
            allGuests = guests;
            return RoomRepository.getRooms();
        })
        .then(rooms => {
            allRooms = rooms;
    ReservationRepository.getReservationById(reservation_id)
        .then(reservation => {
    res.render('reservation/reservation-details', {
    			reservation: reservation,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły rezerwacji',
                formAction: '',
                navLocation: 'reservation',
                allGuests: allGuests,
                allRooms: allRooms,
                validationErrors: []
    			});
     }); });
}
exports.showEditReservationList = (req, res, next) => {
    const reservation_id = req.params.reservationId;
    let allGuests, allRooms;
    GuestRepository.getGuests()
        .then(guests => {
            allGuests = guests;
            return RoomRepository.getRooms();
        })
        .then(rooms => {
            allRooms = rooms;
             
    ReservationRepository.getReservationById(reservation_id)
        .then(reservation => {
            res.render('reservation/reservation-details', {
                reservation: reservation,
                formMode: 'edit',
                pageTitle: 'Edycja rezerwacji',
                btnLabel: 'Edytuj rezerwację',
                formAction: '/reservation/edit',
                navLocation: 'reservation',
                allGuests: allGuests,
                allRooms: allRooms,
                validationErrors: []
            });
        }); });
}
exports.addReservation = (req, res, next) => {
    const  reservationData = { ...req.body };
    let allGuests, allRooms;
    GuestRepository.getGuests()
        .then(guests => {
            allGuests = guests;
            return RoomRepository.getRooms();
        })
        .then(rooms => {
            allRooms = rooms;
    ReservationRepository.createReservation(reservationData)
        .then( result => {
            res.redirect('/reservation');
        })
        .catch(err => {
            res.render('reservation/reservation-form', {
                reservation: reservationData,
                pageTitle: 'Dodawanie rezerwacji',
                formMode: 'createNew',
                btnLabel: 'Dodaj rezerwację',
                formAction: '/reservation/add',
                 allGuests: allGuests,
                allRooms: allRooms,
                navLocation: 'reservation',
                validationErrors: err.details
            });
        });});
};

exports.updateReservation = (req, res, next) => {
    const reservation_id = req.body._id;
    const reservationData = { ...req.body };
    let allGuests, allRooms;
    GuestRepository.getGuests()
        .then(guests => {
            allGuests = guests;
            return RoomRepository.getRooms();
        })
        .then(rooms => {
            allRooms = rooms;
        ReservationRepository.updateReservation(reservation_id, reservationData)
    .then( result => {
        res.redirect('/reservation');
    }).catch(err => {
            res.render('reservation/reservation-details', {
                reservation: reservationData,
                formMode: 'edit',
                pageTitle: 'Edycja rezerwacji',
                btnLabel: 'Edytuj rezerwację',
                formAction: '/reservation/edit',
                navLocation: 'reservation',
                allGuests: allGuests,
                allRooms: allRooms,
                validationErrors: err.details
            });
        }); });
    
};

exports.deleteReservation = (req, res, next) => {
    const reservation_id = req.params.reservationId;
    ReservationRepository.deleteReservation(reservation_id)
    .then( () => {
        res.redirect('/reservation');
    });
};