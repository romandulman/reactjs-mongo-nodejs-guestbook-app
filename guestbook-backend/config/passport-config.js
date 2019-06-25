const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user) =>{
        done(null,user);
    })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'http://localhost:8080/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ // check if user is already in our db
            googleId: profile.id
        })
            .then((currentUser) => {
                if (currentUser) {
                    console.log('user is: ' + currentUser)
                    done(null,currentUser)
                } else {
                    new User({
                        username: profile.displayName,
                        googleId: profile.id
                    })
                        .save()
                        .then((newUser) => {
                            console.log('new created: ' + newUser)
                            done(null,newUser)

                        });
                }
            })

    })
);

/*
passport.use(new FacebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: '/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
        //  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //     return cb(err, user);
        //  });
        console.log(profile);
    }
));*/
