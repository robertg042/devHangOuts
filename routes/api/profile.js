const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");
const validateProfileInput = require("../../validation/profile");
const {
  ERROR_PROFILE_NOT_FOUND,
  fieldAlreadyExists
} = require("../../shared/messages");

// @route GET api/profile/test
// @desc test route for profile
// @access Public
router.get("/test", (req, res) => {
  res.json("Hello world");
});

// @route GET api/profile
// @desc Get current user profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = ERROR_PROFILE_NOT_FOUND;

          return res.status(404).json(errors);
        }

        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile
// @desc Create or update profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const fields = {};
    const propsArray = [
      "handle",
      "company",
      "website",
      "location",
      "bio",
      "status",
      "githubusername"
    ];

    fields.user = req.user.id;

    propsArray.forEach(prop => {
      if (req.body[prop]) {
        fields[prop] = req.body[prop];
      }
    });

    if (req.body.skills) {
      fields.skills = req.body.skills.split(",").map(skill => skill.trim());
    }

    fields.social = {};
    const socialPropsArray = [
      "youtube",
      "twitter",
      "facebook",
      "linkedin",
      "instagram"
    ];

    socialPropsArray.forEach(prop => {
      if (req.body[prop]) {
        fields.social[prop] = req.body[prop];
      }
    });

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: fields },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => console.log(err));
        } else {
          // Create

          // Check handle
          Profile.findOne({ handle: req.user.handle })
            .then(profile => {
              if (profile) {
                errors.handle = fieldAlreadyExists("handle");
                res.status(400).json(errors);
              } else {
                new Profile(fields).save().then(profile => res.json(profile));
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
