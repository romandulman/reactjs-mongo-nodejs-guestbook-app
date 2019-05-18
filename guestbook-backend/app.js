
let users = {
    1: {
        id: '1',
        username: 'Robin Wieruch',
    },
    2: {
        id: '2',
        username: 'Dave Davids',
    },
};


var express = require('express');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var logger = require('morgan');
var mongoose = require('mongoose');
var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//mongoose.connect('mongodb://192.168.99.100:27017/testdb', {useNewUrlParser: true}); // dev local network
// //mongoose.connect('mongodb://mongodb:27017/testdb', {useNewUrlParser: true}); //production docker network


// var db = mongoose.connection;
// // db.on('error', console.error.bind(console, 'connection error:'));
// // db.once('open', function() {
// //     console.log('ok')
// //
// // });


app.get('/users', (req, res ) => {
    return res.send(Object.values(users));
});


app.get('/', function (req, res) {
    res.send('Hello World');
});


app.post('/u', (req, res) => {
    return res.send(Object.values(users));
});






app.use(function(req, res, next) {
  next(createError(404));
 });





// // error handler
 app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
  res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
   res.status(err.status || 500);
   res.render('error');
 });

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})