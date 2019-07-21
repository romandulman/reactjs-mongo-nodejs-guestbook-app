const express = require("express");
const router = express.Router();
const Guest = require("../models/guests-model");
const guestCtl = require("../controllers/guestCtl");

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

router.get("/allguests", (req, res) => {
  guestCtl.loadAllGuets(req, res);
});

router.get("/:name", (req, res) => {
  Guest.find({
    Name: req.params.name
  }).then(specGuest => {
    res.send(specGuest[0]._id);
  });
});

router.post("/postguest", (req, res) => {
  guestCtl.addGuest(req, res);
});

router.delete("/delguest/:guestid", (req, res) => {
  const GuestId = req.params.guestid;
  guestCtl.deleteGuest(GuestId, req, res);
});

module.exports = router;
