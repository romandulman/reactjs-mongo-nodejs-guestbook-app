//process.title = guestbook-backend;
//process.title = process.argv[2];
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cookieSession = require("express-session");
//const cookieSession = require("cookie-session");
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const authRoutes = require('./routes/auth-routes');
const guestsRoutes = require('./routes/guests-routes');
const keys = require('./config/keys');
const passportCtl = require('./controllers/passportCtl');

mongoose.connect(keys.authMongoDB.dbURL);
mongoose.connection.once('open', () => {
    app.emit('ready');
    console.log('Mongodb Connected..')
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));

app.use(cookieParser());


app.use(cookieSession({
        secret: [keys.session.cookie_key],
        resave: false,
        saveUninitialized: false,

    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use('/guests', guestsRoutes);

app.use(express.static(path.join(__dirname, 'public',)));


app.use((req, res, next) => {
    next(createError(404));
});

// // error handler
app.use((err, req, res, next) => {
//   // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.status(500).json({
        message: err.message,
        error: err
    });
});

//app.on('ready', function() {
    let server = app.listen(8080, () => {
    let host = 'localhost';
    let port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});
    module.exports = server;
//});

