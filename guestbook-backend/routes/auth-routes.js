const router = require('express').Router();
const passport = require('passport');

//login
router.get('/login', (req, res) => {
    res.render('login', {title: 'Login'})
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
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/google/redirect',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: 'http://localhost:3000'

    }),
    (req, res) => {
        res.send('ok');
    });


router.get('/logout', (req, res) => {
    res.redirect('/');
});

module.exports = router;
