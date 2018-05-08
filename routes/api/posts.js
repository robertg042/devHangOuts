const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const validatePostInput = require("../../validation/post");
const { ERROR_INTERNAL_ERROR } = require("../../shared/messages");

// @route GET api/posts/test
// @desc test route for posts
// @access Public
router.get("/test", (req, res) => {
  res.json("Hello world");
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: ERROR_INTERNAL_ERROR });
      });
  }
);

module.exports = router;
