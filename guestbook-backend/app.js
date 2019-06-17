//process.title = guestbook-backend;
//process.title = process.argv[2];

let express = require('express');
let app = express();
let cookieParser = require('cookie-parser');
let createError = require('http-errors');
let logger = require('morgan');
let path = require('path');
let cors = require('cors');
let mongoose = require('mongoose');
let passport = require('passport');
let Strategy = require('passport-local').Strategy;
const authRoutes = require('./routes/auth-routes');
const indexRoutes = require('./routes/index');
const keys = require('./config/keys');
require('./config/passport-config');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use('/', indexRoutes);

//mongoose.connect('mongodb://192.168.2.13:27017/testdb', {useNewUrlParser: true}); // local dev mongodb container/instance
mongoose.connect(keys.authMongoDB.dbURL, () =>{
    console.log('mongo connected')
});


app.use(express.static(path.join(__dirname, 'public')));

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
