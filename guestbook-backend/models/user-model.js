const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const userSchema =  new Schema({
    username: String,
    password: String,
    googleId: String,
    profileimage: String
});

userSchema.methods.VerifyPassword = (password) =>{
    console.log(this.password);
    return this.password === password;

};

/*userSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(
            crypto.randomBytes(16).toString('base64'),
            'base64'
        );
        this.password = crypto.pbkdf2Sync(
            password, this.salt, 10000, 64).toString('base64')
}
next();
});*/

const User = mongoose.model('user', userSchema);

module.exports = User;