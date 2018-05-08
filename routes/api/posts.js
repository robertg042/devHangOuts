const express = require("express");
const router = express.Router();
const passport = require("passport");

const Post = require("../../models/Post");
const validatePostInput = require("../../validation/post");
const isEmpty = require("../../shared/isEmpty");
const msg = require("../../shared/messages");

// @route GET api/posts/test
// @desc test route for posts
// @access Public
router.get("/test", (req, res) => {
  res.json("Hello world");
});

// @route GET api/posts
// @desc Get all posts
// @access Public
router.get("/", (req, res) => {
  Post.find().sort()
    .then(posts => {
      if (!isEmpty(posts)) {
        return res.json(posts);
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(404).json({ error: msg.fieldNotFound("posts") });
    });
});

// @route GET api/posts/:post_id
// @desc Get single post
// @access Public
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      if (!isEmpty(post)) {
        return res.json(post);
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(404).json({ error: msg.fieldNotFound("post") });
    });
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

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

// @route DELETE /api/posts/:post_id
// @desc Delete post
// @access Private
router.delete("/:post_id", passport.authenticate("jwt", { session: false }), (res, req) => {
  Post.findById(req.params.post_id)
    .then(post => {
      if (post) {
        // Post found
        if (post.id.toString() === req.user.id) {
          // User is the post's author and can delete it
          return res.json({ success: true });
        } else {
          return res.status(401).json({ error: msg.ERROR_USER_NOT_AUTHORIZED });
        }
      } else {
        return res.status(404).json({ error: msg.fieldNotFound("post") });
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
    });
});

module.exports = router;
