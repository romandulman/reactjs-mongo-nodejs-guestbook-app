const express = require("express");
const router = express.Router();
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

router.get("/allguests", guestCtl.getAllGuets);
router.get("/:name", guestCtl.getSingleGuest);
router.post("/postguest", guestCtl.addGuest);
router.delete("/delguest/:id", guestCtl.deleteGuest);

module.exports = router;
