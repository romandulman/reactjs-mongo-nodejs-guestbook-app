const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: String,
  Body: String,
  Image: String
});
const Guest = mongoose.model("guests", userSchema);

module.exports = Guest;
