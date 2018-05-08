const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
const isEmpty = require("../../shared/isEmpty");
const {
  ERROR_PROFILE_NOT_FOUND,
  ERROR_PROFILES_NOT_FOUND,
  ERROR_INTERNAL_ERROR,
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
      if (isEmpty(profiles)) {
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
                new Profile(fields)
                  .save()
                  .then(profile => res.json(profile))
                  .catch(err => {
                    console.log(err);

                    return res
                      .status(500)
                      .json({ error: ERROR_INTERNAL_ERROR });
                  });
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

              return res.status(500).json({ error: ERROR_INTERNAL_ERROR });
            });
        } else {
          return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
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

              return res.status(500).json({ error: ERROR_INTERNAL_ERROR });
            });
        } else {
          return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
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
          // Get experience index
          const expIndex = profile.experience
            .map(exp => exp.id)
            .indexOf(req.params.exp_id);

          profile.experience.splice(expIndex, 1);

          profile
            .save()
            .then(profile => res.json(profile))
            .catch(err => {
              console.log(err);

              return res.status(500).json({ error: ERROR_INTERNAL_ERROR });
            });
        } else {
          return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
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
          // Get education index
          const eduIndex = profile.education
            .map(edu => edu.id)
            .indexOf(req.params.edu_id);

          profile.education.splice(eduIndex, 1);

          profile
            .save()
            .then(profile => res.json(profile))
            .catch(err => {
              console.log(err);

              return res.status(500).json({ error: ERROR_INTERNAL_ERROR });
            });
        } else {
          return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(404).json({ error: ERROR_PROFILE_NOT_FOUND });
      });
  }
);

module.exports = router;
