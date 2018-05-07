const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");
const validateProfileInput = require("../../validation/profile");
const {
  ERROR_PROFILE_NOT_FOUND,
  ERROR_PROFILES_NOT_FOUND,
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
      .catch(err => {
        console.log(err);

        return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
      });
  }
);

// @route GET api/profile/all
// @desc Get all profiles
// @access Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = ERROR_PROFILES_NOT_FOUND;

        return res.status(404).json(errors);
      } else {
        return res.json(profiles);
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(404).json({ error: ERROR_PROFILES_NOT_FOUND });
    });
});

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = ERROR_PROFILE_NOT_FOUND;

        return res.status(404).json(errors);
      } else {
        return res.json(profile);
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
    });
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = ERROR_PROFILE_NOT_FOUND;

        return res.status(404).json(errors);
      } else {
        return res.json(profile);
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
    });
});

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
            .catch(err => {
              console.log(err);

              return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
            });
        } else {
          // Create

          // Check handle
          Profile.findOne({ handle: fields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = fieldAlreadyExists("handle");

                return res.status(400).json(errors);
              } else {
                new Profile(fields).save().then(profile => res.json(profile));
              }
            })
            .catch(err => {
              console.log(err);

              return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
            });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
      });
  }
);

module.exports = router;
