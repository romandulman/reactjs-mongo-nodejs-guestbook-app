//process.title = guestbook-backend;
//process.title = process.argv[2];

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cookieSession = require("express-session");
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const authRoutes = require('./routes/auth-routes');
const indexRoutes = require('./routes/index');
const keys = require('./config/keys');
const passportCtl = require('./controllers/passportCtl');

mongoose.connect(keys.authMongoDB.dbURL, () =>{
    console.log('mongo connected')
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieSession({
        secret:'ssshhhh',
        maxAge: 24 * 60 * 60 * 1000,
        secret: [keys.session.cookie_key],
        name: 'guestbookAuth'

    })
);
app.use(logger('dev'));

app.use(cookieParser());


app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

app.use('/auth', authRoutes);
app.use('/', indexRoutes);

app.use(express.static(path.join(__dirname, 'public', )));

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



/*app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); */

app.get("/", authCheck, (req, res) => {
    res.status(200).json({
        authenticated: true,
        message: "user successfully authenticated",
        user: req.user,
        cookies: req.cookies
    });
});

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

let server = app.listen(8080, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});

module.exports = server;
