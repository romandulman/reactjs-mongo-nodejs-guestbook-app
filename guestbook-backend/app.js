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
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

mongoose.connect('mongodb://192.168.2.13:27017/testdb', {useNewUrlParser: true}); // local dev mongodb container/instance

let userSchema = mongoose.Schema({
    Name: String,
    Body: String
});

let db = mongoose.connection;
let collection = db.collection('testcoll');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Mongo Connected');
    collection.find({Name: "Aron"}).toArray((err, guests) => {
        console.log(guests[0].Body) // test it
    });
});

passport.use(new Strategy(
    function (username, password, cb) {
        /*db.users.findByUsername(username, function (err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            if (user.password != password) {
                return cb(null, false);
            }
            return cb(null, user);
        });*/

        if( 'admin' == username ){
            console.log('okkkk')
            return cb(username)

        }

    }));


/*passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});*/


app.post('/login',
    passport.authenticate('local', {failureRedirect: '/failure'}),
    function (req, res) {
        res.send('ok');
        console.log('redt')
    });


/*app.post('/login', (req, res) => {
    let userLogin = {
        Name: req.body.UserName,
        Body: req.body.Password
    };
    passport.authenticate('local', {failureRedirect: '/failure'}),
        function (req, res) {
            res.redirect('/');

    //collection.find().toArray(function (err, guests) {
      // (err) ? console.log(err) : res.send('ok')
  //  });
console.log(userLogin)

});*/

app.get('/guests', (req, res) => {
    collection.find().toArray(function (err, guests) {
        (err) ? console.log(err) : res.send(Object.values(guests))
    });
});

app.get('/guests/:name', (req, res) => {
    collection.find({Name: req.params.name}).toArray((err, guests) => {
        (!guests || guests.length <= 0) ?  res.status(404).json({
            message: "Guest record not found",
        }) : res.send(guests[0])
    })
});

app.post('/postguest', (req, res) => {
    console.log(req.body);
    let doc = {
        Name: req.body.arr.Name,
        Body: req.body.arr.Body
    };
    collection.insertOne(doc, (error, response) => {
        (error) ? console.log(error) : res.send(response);
        console.log(error)
    });
});

app.delete('/delguest/:guestid', (req, res) => {
   const index = req.params.guestid;
    collection.update({}, {$unset : {"interests.3" : index }})
    collection.update({}, {$pull : {"interests" : null}})
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
