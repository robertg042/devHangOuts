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
const msg = require("../../shared/messages");

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ error: msg.fieldAlreadyExists("email") });
      } else {
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
              .catch(err => {
                console.log(err);

                return res
                  .status(500)
                  .json({ error: msg.ERROR_INTERNAL_ERROR });
              });
          });
        });
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(400).json({ error: msg.ERROR_INVALID_AUTH_DATA });
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

  User.findOne({ email })
    .then(user => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then(isMatched => {
            if (isMatched) {
              // User authorized

              // JWT payload
              const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar
              };

              // Sign token, expires after 24 hours
              jwt.sign(
                payload,
                keys.JWT_SECRET,
                { expiresIn: 60 * 60 * 24 },
                (err, token) => {
                  if (err) {
                    throw err;
                  }

                  return res.json({
                    success: true,
                    token: `Bearer ${token}`
                  });
                }
              );
            } else {
              // Wrong password
              return res
                .status(400)
                .json({ error: msg.ERROR_INVALID_AUTH_DATA });
            }
          })
          .catch(err => {
            console.log(err);

            return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
          });
      } else {
        // Email not found
        return res.status(400).json({ error: msg.ERROR_INVALID_AUTH_DATA });
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(400).json({ error: msg.ERROR_INVALID_AUTH_DATA });
    });
});

// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) =>
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
);

module.exports = router;
