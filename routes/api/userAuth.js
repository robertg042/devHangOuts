const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");
const {
  fieldAlreadyExists,
  ERROR_INVALID_AUTH_DATA
} = require("../../shared/messages");

// @route  GET api/user/test
// @desc   Testing route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "This is a test..." }));

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = fieldAlreadyExists("email");

      return res.status(400).json({ errors });
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

// @route  POST api/users/login
// @desc   Login user
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email } = req.body;
  const { password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      // Email not found
      errors.email = ERROR_INVALID_AUTH_DATA;
      res.status(400).json({ errors });
    } else {
      bcrypt.compare(password, user.password).then(isMatched => {
        if (isMatched) {
          // User autorized

          // JWT payload
          const payload = { id: user.id, name: user.name, avatar: user.avatar };

          // Sign token, expires after 24 hours
          jwt.sign(
            payload,
            keys.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 },
            (err, token) => {
              if (err) {
                throw err;
              }
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          );
        } else {
          // Wrong password
          errors.password = ERROR_INVALID_AUTH_DATA;
          res.status(400).json({ errors });
        }
      });
    }
  });
});

// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
