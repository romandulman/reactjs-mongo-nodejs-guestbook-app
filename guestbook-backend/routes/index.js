const express = require('express');
const router = express.Router();
const Guest = require('../models/guests-model');
const guestCtl = require('../controllers/guestCtl');


router.get('/guests', (req, res) => {
    guestCtl.loadAllGuets(req,res)
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
    guestCtl.addGuest(req,res)
});


router.delete('/delguest/:guestid', (req, res) => {
    const GuestId = req.params.guestid ;
    guestCtl.deleteGuest(GuestId,req,res)
});

module.exports = router;
