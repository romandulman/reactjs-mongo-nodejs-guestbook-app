const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook');
const LocalStrategy = require('passport-local').Strategy;
const keys = require('../config/keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
});

passport.use(
    new LocalStrategy(
        (username, password, done) => {
            User.findOne({username: username}, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (user.password != password) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));

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
                    done(null, currentUser)
                } else {
                    new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        profileimage: profile._json['picture']
                    })
                        .save()
                        .then((newUser) => {
                            done(null, newUser)
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
