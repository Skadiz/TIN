const GuestRepository = require('../repository/mysql2/GuestRepository');

exports.showGuestList = (req, res, next) => {
    GuestRepository.getGuests()
        .then(guests => {
            res.render('guests/guests', {
                guests: guests,
                navLocation: 'guest'
            });
        });

} 


exports.showAddGuestForm = (req, res, next) => {
    res.render('guests/guests-form', {
        guest: {},
        pageTitle: 'Nowy gośc',
        formMode: 'createNew',
        btnLabel: 'Dodaj gościa',
        formAction: '/guests/add',
        navLocation: 'guest',
        validationErrors: []
    });
}
exports.showGuestDetails = (req, res, next) => {
	const guest_id = req.params.guest_id;
    GuestRepository.getGuestById(guest_id)
        .then(guest => {
    res.render('guests/guests-details', {
    			guest: guest,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły gościa',
                formAction: '',
                navLocation: 'guest',
                validationErrors: []
    			});
     });

}
exports.showEditGuestForm = (req, res, next) => {
    const guest_id = req.params.guest_id;
    GuestRepository.getGuestById(guest_id)
        .then(guest => {
            res.render('guests/guests-details', {
                guest: guest,
                formMode: 'edit',
                pageTitle: 'Edycja gościa',
                btnLabel: 'Edytuj gościa',
                formAction: '/guests/edit',
                navLocation: 'guest',
                validationErrors: []
            });
        });
}
exports.addGuest = (req, res, next) => {
	const guestData = { ...req.body };
    GuestRepository.createGuest(guestData)
        .then( result => {
            res.redirect('/guests');
        })
        .catch(err => {
            res.render('guests/guests-form',
             {
                guest: guestData,
                pageTitle: 'Dodawanie gościa',
                formMode: 'createNew',
                btnLabel: 'Dodaj gościa',
                formAction: '/guests/add',
                navLocation: 'guest',
                validationErrors: err.details
            });
        });
};

exports.updateGuest = (req, res, next) => {
	const guest_id = req.body._id;
	const guestData = { ...req.body };
	GuestRepository.updateGuest(guest_id, guestData)
    .then( result => {
        res.redirect('/guests');
    }).catch(err => {
            res.render('guests/guests-details',
             {
                guest: guestData,
                pageTitle: 'Edycja gościa',
                formMode: 'updateGuest',
                btnLabel: 'Edytuj gościa',
                formAction: '/guests/edit',
                navLocation: 'guest',
                validationErrors: err.details
            });
        });
};

exports.deleteGuest = (req, res, next) => {
	const guest_id = req.params.guest_id;
	GuestRepository.deleteGuest(guest_id)
    .then( () => {
        res.redirect('/guests');
    });
};
