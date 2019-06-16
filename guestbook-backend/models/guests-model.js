const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name: String,
    Body: String
});
const Guest = mongoose.model('guests', userSchema);

module.exports = Guest;