const router = require('express').Router();
const passport = require('passport');

//login
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login'}),
    (req,res)=>{
        res.send({
            token: req.user,
        });

    })


/*router.get("/login/success", (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    }
});*/

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    });
});
router.get('/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login']
    }));

router.get('/facebook',
    passport.authenticate('facebook', {
        scope: ['user_friends', 'manage_pages']

    }));

router.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login',
        successRedirect: 'http://localhost:3000'
    }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/google/redirect',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: 'http://localhost:3000'

    })
);

   // (req, res) => {
   //     res.send('ok');
  //  });


    router.get("/logout", (req, res) => {
        req.logout();
        res.redirect('http://localhost:3000');
    });


module.exports = router;
