const Guest = require("../models/guests-model");
const buffer = require("buffer");
const path = require("path");
const fs = require("fs");
const cryptoRandomString = require("crypto-random-string");

class guestCtl {
  addGuest(req, res) {

    if (req.body.arr.Image.length > 2){
      const base64String = req.body.arr.Image;
      const base64Image = base64String.split(';base64,').pop();
      const buf = Buffer.from(base64Image, "base64");
      const filename = cryptoRandomString({ length: 10, type: "url-safe" });
      var imageUrl = "/image_uploads/" + filename + ".png";
      fs.writeFile(
          path.join(__dirname, "../public/image_uploads", filename + ".png"), buf,
          (error)=> {
            if (error) {
              throw error;
            } else {
              console.log("File created from base64 string");
              console.log("image URL:"+ imageUrl);
              return true;
            }
          }
      );
    }else{
      imageUrl = "/image_uploads/" + 'default-guest' + ".png";
    }

    new Guest({
      Name: req.body.arr.Name,
      Body: req.body.arr.Body,
      Image: imageUrl
    })
      .save()
      .then(newGuest => {
        res.send(newGuest);
        console.log(newGuest);
      });
  }
  decode_base64(base64str) {
    let buf = Buffer.from(base64str, "base64");
    let filename = cryptoRandomString({ length: 10, type: "base64" });
    fs.writeFile(
        path.join(__dirname, "../public/image_uploads", filename + ".png"),
        buf,
        function(error) {
          if (error) {
            throw error;
          } else {
            console.log("File created from base64 string!");
            return true;
          }
        }
    );
  }

  loadAllGuets(req, res) {
    Guest.find({}).then(AllGuests => {
      if (AllGuests) {
        res.send(Object.values(AllGuests));
      }
    });
  }

  deleteGuest(guestid, req, res) {
    Guest.deleteOne({
      _id: guestid
    }).then(deleted => {
      res.send(deleted);
    });
  }
}

module.exports = new guestCtl();
