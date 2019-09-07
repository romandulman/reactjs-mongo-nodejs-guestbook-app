const router = require("express").Router();
const passport = require("passport");
const authCheck = require("../middlewares/authCheck")


router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.send({
      profile: {
        Username: req.user.username,
        Email: "",
        ProfileImage: req.user.profileimage
      }
    });
  }
);
router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
  })
);


router.get("/login/success", authCheck, (req, res) => {
  res.send({
    profile: {
      Username: req.user.username,
      Email: "",
      ProfileImage: req.user.profileimage
    }
  });
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["user_friends", "manage_pages"]
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:3000"
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:3000"
  })
);

router.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy(function(err) {
    // res.clearCookie('connect.sid');
    res.send("Logged out");
    //res.redirect('http://localhost:3000');
  });
});


module.exports = router;
