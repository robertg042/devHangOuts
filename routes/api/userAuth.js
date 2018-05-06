const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

// @route  GET api/user/test
// @desc   Testing route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "This is a test..." }));

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      console.log(req);
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default: generic account avatar
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw err;
        }
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  GET api/users/login
// @desc   Login user
// @access Public
router.use("/login", (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      res.status(400).json({ error: "Invalid authentication data" });
    } else {
      bcrypt.compare(password, user.password).then(isMatched => {
        if (isMatched) {
          res.json({ message: "success" });
        } else {
          res.status(400).json({ error: "Invalid authentication data" });
        }
      });
    }
  });
});

module.exports = router;
