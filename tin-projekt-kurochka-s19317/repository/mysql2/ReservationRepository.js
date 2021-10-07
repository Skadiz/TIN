const db = require('../../config/mysql2/db');
const reservationSchema = require('../../model/joi/Reservation');

 
exports.getReservation = () => {
    const query = `SELECT res._id as resId, res.dateFrom, res.dateTo, r._id as roomId, r.roomNumber,
            r.type, r.price, r.numberOfPlaces, g._id as guestId, g.firstName, g.lastName, g.pesel
        FROM Reservation res
        left join Guest g on res.guestId = g._id
        left join Room r on res.roomId = r._id`
    return db.promise().query(query)
        .then( (results, fields) => {
            const reservations = [];
            for(let i=0; i<results[0].length; i++) {
                const row = results[0][i];
                const reservation = {
                    _id: row.resId,
                    dateFrom: row.dateFrom,
                    dateTo: row.dateTo,
                    room: {
                        _id: row.roomId,
                        roomNumber: row.roomNumber,
                        type: row.type,
			            price: row.price,
			            numberOfPlaces: row.numberOfPlaces
                    },
                    guest: {
                        _id: row.guestId,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        pesel: row.pesel
                    }
                };
                reservations.push(reservation);
            }
            console.log(reservations);
            return reservations;
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getReservationById = (reservationId) => {
    const query = `SELECT res._id as resId, res.dateFrom, res.dateTo, r._id as roomId, r.roomNumber,
            r.type, r.numberOfPlaces, r.price, g._id as guestId, g.firstName, g.lastName, g.pesel, g.dateOfBirth
        FROM Reservation res 
        left join Guest g on res.guestId = g._id
        left join Room r on res.roomId = r._id
        where res._id = ?`
    return db.promise().query(query, [reservationId])
        .then( (results, fields) => {
            const row = results[0][0];
            if(!row) {
                return {};
            }
            const reservation = {
                _id: reservationId,
                dateFrom: row.dateFrom,
                dateTo: row.dateTo,
                room: {
                    _id: row.roomId,
                    roomNumber: row.roomNumber,
                    type: row.type,
                    price: row.price,
                    numherOfPlaces: row.numberOfPlaces
                },
                guest: {
                    _id: row.guestId,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    pesel: row.pesel,
                    dateOfBirth: row.dateOfBirth
                }
            };
            console.log(reservation);
            return reservation;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createReservation = (data) => {
    const vRes = reservationSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    } 
    console.log('createReservation');
    console.log(data);
    const sql = 'INSERT into Reservation (guestId, roomId, dateFrom, dateTo) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql, [data.guestId, data.roomId, data.dateFrom, data.dateTo]);
};

exports.updateReservation = (resId, data) => {
    const vRes = reservationSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    } 
    data.dateTo = data.dateTo ? data.dateTo : null;
    const sql = `UPDATE Reservation set guestId = ?, roomId = ?, dateFrom = ?, dateTo = ? where _id = ?`;
    return db.promise().execute(sql, [data.guestId, data.roomId, data.dateFrom, data.dateTo, resId]);
}

exports.deleteReservation = (reservationId) => {
    const sql = 'DELETE FROM Reservation where _id = ?'
    return db.promise().execute(sql, [reservationId]);
}

exports.deleteManyReservations = (ReservationIds) => {
    const sql = 'DELETE FROM Reservation where _id IN (?)'
    return db.promise().execute(sql, [ReservationIds]);
}