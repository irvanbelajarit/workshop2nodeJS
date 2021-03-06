const express = require("express");
const router = express.Router();

//middleware
const passport = require("passport");
const jwt = require("jsonwebtoken");

//models users
const User = require("../models/users");
const config = require("../config/database");

router.post("/register", (req, res, next) => {
  // res.send("halaman register");
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: "gagal tersimpan" });
    } else {
      res.json({ success: true, msg: "data user tersimpan" });
    }
  });
});
router.post("/authenticate", (req, res, next) => {
  // res.send("halaman authenticate");
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "user tidak ditemukan" });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ user }, config.secret, { expiresIn: 604800 });
        res.json({
          success: true,
          token: "Bearer " + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
          },
        });
      } else {
        return res.json({ success: false, msg: "password salah!" });
      }
    });
  });
});
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    //res.send("halaman profile");
    res.json({ user: req.user });
  }
);

module.exports = router;
