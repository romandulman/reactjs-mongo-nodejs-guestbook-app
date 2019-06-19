const express = require('express');
const router = express.Router();
const Guest = require('../models/guests-model');


router.get('/guests', (req, res) => {
    Guest.find({})
        .then((AllGuests) => {
            if (AllGuests) {
            //    console.log('user is: ' + AllGuests);
                res.send(Object.values(AllGuests))
                console.log(AllGuests)
            }
        })
});

router.get('/guests/:name', (req, res) => {
    Guest.find({
        Name: req.params.name
    })

        .then((specGuest) => {
            console.log('user is: ' + specGuest);
            res.send(specGuest[0]._id)
        })

});

router.post('/postguest', (req, res) => {
    new Guest({
        Name: req.body.arr.Name,
        Body: req.body.arr.Body

    })
        .save()
        .then((newGuest) => {
            console.log('new created: ' + newGuest);
            res.send(newGuest)
        })
});


router.delete('/delguest/:guestid', (req, res) => {
    const index = req.params.guestid;
    console.log('isssss   '+index);
  Guest.deleteOne( {
      _id: index
  } ).then((deleted) => {
      console.log(deleted)
    })


})



module.exports = router;
