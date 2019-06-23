const Guest = require('../models/guests-model');

class guestCtl {

    addGuest  = (req, res) => {
        new Guest({
            Name: req.body.arr.Name,
            Body: req.body.arr.Body

        })
            .save()
            .then((newGuest) => {
                console.log('new created: ' + newGuest);
                res.send(newGuest)
            })
    };

    loadAllGuets = (req,res) =>{
        Guest.find({})
            .then((AllGuests) => {
                if (AllGuests) {
                    //    console.log('user is: ' + AllGuests);
                    res.send(Object.values(AllGuests))
                    console.log(AllGuests)
                }
            })
    };

    deleteGuest = (req,res) =>{




    };


};

module.exports = new  guestCtl;