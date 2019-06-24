const Guest = require('../models/guests-model');

class guestCtl {

    addGuest(req, res){
        new Guest({
            Name: req.body.arr.Name,
            Body: req.body.arr.Body

        })
            .save()
            .then((newGuest) => {
                res.send(newGuest)
            })
    };

    loadAllGuets(req, res){
        Guest.find({})
            .then((AllGuests) => {
                if (AllGuests) {
                    res.send(Object.values(AllGuests));
                }
            })
    };

    deleteGuest(req, res){


    };
}

module.exports = new guestCtl;