const db = require('../../config/mysql2/db');
const guestSchema = require('../../model/joi/Guest');
 exports.getGuests = () => {
return db.promise().query('SELECT * FROM Guest')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

};
    

exports.getGuestById = (guest_id) => {
const query = `SELECT g._id as _id, g.firstName, g.lastName, g.pesel, g.dateOfBirth, res._id as resId,
        res.dateFrom, r._id as roomId, res.dateTo, r.roomNumber, r.type, r.price, r.numberOfPlaces 
    FROM Guest g 
    left join Reservation res on res.guestId = g._id
    left join Room r on res.roomId = r._id 
    where g._id = ?`
return db.promise().query(query, [guest_id])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const guest = {
            _id: parseInt(guest_id),
            firstName: firstRow.firstName,
            lastName: firstRow.lastName,
            pesel: firstRow.pesel,
            dateOfBirth: firstRow.dateOfBirth,
            reservations: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.resId) {
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
                    }
                };
                guest.reservations.push(reservation);
            }
        }
        return guest;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

};

exports.createGuest = (newGuestData) => {
const vRes = guestSchema.validate(newGuestData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }    
const firstName = newGuestData.firstName;
const lastName = newGuestData.lastName;
const pesel= newGuestData.pesel;
const dateOfBirth= newGuestData.dateOfBirth;
const sql = 'INSERT into Guest (firstName, lastName, pesel, dateOfBirth) VALUES (?, ?, ?, ?)'
return db.promise().execute(sql, [firstName, lastName, pesel, dateOfBirth]);

};

exports.updateGuest = (guest_id, guestData) => {
        
 const vRes = guestSchema.validate(guestData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }     
const firstName = guestData.firstName;
const lastName = guestData.lastName;
const pesel = guestData.pesel;
const dateOfBirth=guestData.dateOfBirth;


const sql = `UPDATE Guest set firstName = ?, lastName = ?, pesel = ?, dateOfBirth = ? where _id = ?`;
return db.promise().execute(sql, [firstName, lastName, pesel, dateOfBirth, guest_id]);
};

exports.deleteGuest = (guest_id) => {
const sql1 = 'DELETE FROM Reservation where guestId = ?'
const sql2 = 'DELETE FROM Guest where _id = ?'

return db.promise().execute(sql1, [guest_id])
    .then(() => {
        return db.promise().execute(sql2, [guest_id])
    });
};