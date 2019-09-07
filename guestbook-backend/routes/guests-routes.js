const express = require("express");
const router = express.Router();
const guestCtl = require("../controllers/guestCtl");
const authCheck = require("../middlewares/authCheck")


router.get("/allguests", guestCtl.getAllGuets);
router.get("/:name", guestCtl.getSingleGuest);
router.post("/postguest",authCheck, guestCtl.addGuest);
router.delete("/delguest/:id",authCheck, guestCtl.deleteGuest);

module.exports = router;
