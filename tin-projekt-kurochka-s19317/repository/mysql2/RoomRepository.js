const db = require('../../config/mysql2/db');
const roomSchema = require('../../model/joi/Room');

exports.getRooms = () => {
return db.promise().query('SELECT * FROM Room')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    }); 

};

exports.getRoomById = (room_id) => {
const query = `SELECT r._id as roomId, res.dateTo, r.roomNumber, r.type, r.price, r.numberOfPlaces, res._id as resId,
        res.dateFrom, g._id as _id, g.firstName, g.lastName, g.pesel, g.dateOfBirth
    FROM Room r 
    left join Reservation res on res.roomId = r._id
    left join Guest g on res.guestId = g._id 
    where r._id = ?`
return db.promise().query(query, [room_id])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const room = {
            _id: parseInt(room_id),
            roomNumber: firstRow.roomNumber,
            type: firstRow.type,
            price: firstRow.price,
	        numberOfPlaces: firstRow.numberOfPlaces,
            reservations: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.resId) {
                const reservation = {
                    _id: row.resId,
                    dateFrom: row.dateFrom,
                    dateTo: row.dateTo,
                    guest: {
                        _id: row.guestId,
                        firstName: row.firstName,
            		lastName: row.lastName,
            		pesel: row.pesel,
                    }
                };
                room.reservations.push(reservation);
            }
        }
        return room;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

};

exports.createRoom = (newRoomData) => {
    const vRes = roomSchema.validate(newRoomData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    } 
const roomNumber = newRoomData.roomNumber;
const type = newRoomData.type;
const price = newRoomData.price;
const numberOfPlaces = newRoomData.numberOfPlaces;
const sql = 'INSERT into Room (roomNumber, type, price, numberOfPlaces) VALUES (?, ?, ?, ?)'
return db.promise().execute(sql, [roomNumber, type, price, numberOfPlaces]);

};

exports.updateRoom = (room_id, roomData) => {
const vRes = roomSchema.validate(roomData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    } 
const roomNumber = roomData.roomNumber;
const type = roomData.type;
const price = roomData.price;
const numberOfPlaces = roomData.numberOfPlaces;
const sql = `UPDATE Room set roomNumber = ?, type = ?, price = ?, numberOfPlaces = ? where _id = ?`;
return db.promise().execute(sql, [roomNumber, type, price, numberOfPlaces, room_id]);
};

exports.deleteRoom = (room_id) => {
const sql1 = 'DELETE FROM Reservation where roomId = ?'
const sql2 = 'DELETE FROM Room where room._id = ?'

return db.promise().execute(sql1, [room_id])
    .then(() => {
        return db.promise().execute(sql2, [room_id])
    });
};