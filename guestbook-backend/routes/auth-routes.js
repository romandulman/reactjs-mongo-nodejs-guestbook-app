const router = require("express").Router();
const passport = require("passport");

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
    successRedirect: "/profile", // redirect to the secure profile section
    failureRedirect: "/signup", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
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
    // Successful authentication, redirect home.
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
