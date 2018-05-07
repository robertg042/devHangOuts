const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { ERROR_PROFILE_NOT_FOUND } = require("../../shared/messages");

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
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         if (!profile) {
//           errors.noprofile = ERROR_PROFILE_NOT_FOUND;

//           return res.status(404).json(errors);
//         }

//         return res.json(profile);
//       })
//       .catch(err => res.status(404).json(err));
//   });
// };

module.exports = router;
