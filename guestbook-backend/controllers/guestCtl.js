const Guest = require("../models/guests-model");
const buffer = require("buffer");
const path = require("path");
const fs = require("fs");
const cryptoRandomString = require("crypto-random-string");

exports.addGuest = (req, res) => {
  if (req.body.arr.Image.length > 2) {
    const base64String = req.body.arr.Image;
    const base64Image = base64String.split(";base64,").pop();
    const buf = Buffer.from(base64Image, "base64");
    const filename = cryptoRandomString({ length: 10, type: "url-safe" });
    var imageUrl = "/image_uploads/" + filename + ".png";
    fs.writeFile(
      path.join(__dirname, "../public/image_uploads", filename + ".png"),
      buf,
      error => {
        if (error) {
          throw error;
        } else {
          //console.log("File created from base64 string");
          //console.log("image URL:" + imageUrl);
          return true;
        }
      }
    );
  } else {
    imageUrl = "/image_uploads/" + "default-guest" + ".png";
  }
  new Guest({
    Name: req.body.arr.Name,
    Body: req.body.arr.Body,
    Image: imageUrl
  })
    .save()
    .then(newGuest => {
      res.send(newGuest);
      //console.log(newGuest);
    });
};

exports.getAllGuets = (req, res) => {
  Guest.find({}).then(AllGuests => {
    res.send(Object.values(AllGuests));
  });
};

exports.deleteGuest = (req, res) => {
  const GuestId = req.params.id;
  Guest.deleteOne({
    _id: GuestId
  }).then(deleted => {
    res.send(deleted);
  });
};

exports.getSingleGuest = (req, res) => {
  Guest.find({
    Name: req.params.name
  }).then(specGuest => {
    res.send(specGuest[0]._id);
  });
};


