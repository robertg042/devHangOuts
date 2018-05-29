const Validator = require("validator");
const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
const isEmpty = require("../../shared/isEmpty");
const msg = require("../../shared/messages");

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
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (profile) {
          // Profile found
          return res.json(profile);
        } else {
          return res.status(404).json({ error: msg.fieldNotFound("profile") });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

// @route GET api/profile/all
// @desc Get all profiles
// @access Public
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!isEmpty(profiles)) {
        return res.json(profiles);
      } else {
        return res.status(404).json({ error: msg.fieldNotFound("profiles") });
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
    });
});

// @route GET api/profile/:handle
// @desc Get profile by handle
// @access Public
router.get("/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        return res.json(profile);
      } else {
        return res.status(404).json({ error: msg.fieldNotFound("profile") });
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
    });
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public
router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        return res.json(profile);
      } else {
        return res.status(404).json({ error: msg.fieldNotFound("profile") });
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
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

    fields.user = req.user.id;

    Object.keys(req.body).map(key => {
      fields[key] = req.body[key];
    });

    console.log(fields);

    if (!Validator.isEmpty(req.body.skills)) {
      fields.skills = req.body.skills
        .split(",")
        .map(skill => skill.trim())
        .filter((value, index, array) => array.indexOf(value) === index);
    } else {
      fields.skills = [];
    }

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

              return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
            });
        } else {
          // Create

          // Check handle
          Profile.findOne({ handle: fields.handle })
            .then(profile => {
              if (profile) {
                return res
                  .status(400)
                  .json({ handle: msg.fieldAlreadyExists("handle") });
              } else {
                new Profile(fields)
                  .save()
                  .then(profile => res.json(profile))
                  .catch(err => {
                    console.log(err);

                    return res
                      .status(500)
                      .json({ error: msg.ERROR_INTERNAL_ERROR });
                  });
              }
            })
            .catch(err => {
              console.log(err);

              return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
            });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

// @route POST api/profile/experience
// @desc Add experience to profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          };

          // Add to experience array
          profile.experience.unshift(newExp);

          profile
            .save()
            .then(profile => res.json(profile))
            .catch(err => {
              console.log(err);

              return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
            });
        } else {
          return res.status(404).json({ error: msg.fieldNotFound("profile") });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

// @route POST api/profile/education
// @desc Add education to profile
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          };

          // Add to experience array
          profile.education.unshift(newEdu);

          profile
            .save()
            .then(profile => res.json(profile))
            .catch(err => {
              console.log(err);

              return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
            });
        } else {
          return res.status(404).json({ error: msg.fieldNotFound("profile") });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc Delete experience from profile
// @access Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          profile.experience = profile.experience.filter(
            exp => exp.id !== req.params.exp_id
          );

          profile
            .save()
            .then(profile => res.json(profile))
            .catch(err => {
              console.log(err);

              return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
            });
        } else {
          return res.status(404).json({ error: msg.fieldNotFound("profile") });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

// @route DELETE api/profile/education/:edu_id
// @desc Delete education from profile
// @access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          profile.education = profile.education.filter(
            edu => edu.id !== req.params.edu_id
          );

          profile
            .save()
            .then(profile => res.json(profile))
            .catch(err => {
              console.log(err);

              return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
            });
        } else {
          return res.status(404).json({ error: msg.fieldNotFound("profile") });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

// @route DELETE api/profile/
// @desc Delete user and profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Delete profile if exists
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        // Delete user
        User.findOneAndRemove({ _id: req.user.id })
          .then(user => {
            if (user) {
              return res.json({ success: true });
            } else {
              return res.json({ success: false });
            }
          })
          .catch(err => {
            console.log(err);

            return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
          });
      })
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

module.exports = router;
