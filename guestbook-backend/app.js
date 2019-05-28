

var express = require('express');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var logger = require('morgan');
var path = require('path');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

mongoose.connect('mongodb://192.168.99.100:27017/testdb', {useNewUrlParser: true}); // dev mongo container
// //mongoose.connect('mongodb://mongodb:27017/testdb', {useNewUrlParser: true}); //production docker network

var userSchema = mongoose.Schema({
    Name: String,
    Body: String
});

var db = mongoose.connection;
var collection = db.collection('testcoll');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongo Connected');
    collection.find({Name: "Aron"}).toArray(function (err, guests) {
        console.log(guests[0].Body) // test it
    });

});


app.get('/guests', (req, res) => {
    collection.find().toArray(function (err, kittens) {
        return res.send(Object.values(kittens))
    });

});

app.post('/postguest', (req, res) => {

});

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    next(createError(404));
});


// // error handler
app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});