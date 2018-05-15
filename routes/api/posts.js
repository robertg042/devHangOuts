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
  Post.find()
    .sort()
    .then(posts => {
      if (!isEmpty(posts)) {
        return res.json(posts);
      } else {
        return res.status(404).json({ error: msg.fieldNotFound("posts") });
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
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
      } else {
        return res.status(404).json({ error: msg.fieldNotFound("post") });
      }
    })
    .catch(err => {
      console.log(err);

      return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
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
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (post) {
          // Post found
          if (post.user.toString() === req.user.id) {
            // User is the post's author and can delete it
            post
              .remove()
              .then(() => res.json({ success: true }))
              .catch(err => {
                console.log(err);

                return res
                  .status(500)
                  .json({ error: msg.ERROR_INTERNAL_ERROR });
              });
          } else {
            return res
              .status(403)
              .json({ error: msg.ERROR_USER_NOT_AUTHORIZED });
          }
        } else {
          return res.status(404).json({ error: msg.fieldNotFound("post") });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

// @route POST /api/posts/like/:post_id
// @desc Like post
// @access Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (post) {
          // Post found
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            // Post can be liked
            post.likes.unshift({ user: req.user.id });

            post
              .save()
              .then(post => res.json(post))
              .catch(err => {
                console.log(err);

                return res
                  .status(500)
                  .json({ error: msg.ERROR_INTERNAL_ERROR });
              });
          } else {
            // Post has already been liked
            return res
              .status(400)
              .json({ error: msg.ERROR_USER_ALREADY_LIKED_POST });
          }
        } else {
          return res.status(404).json({ error: msg.fieldNotFound("post") });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

// @route DELETE /api/posts/like/:post_id
// @desc Dislike post
// @access Private
router.delete(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (post) {
          // Post found
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            // Post has not been liked yet
            return res
              .status(400)
              .json({ error: msg.ERROR_CANNOT_DISLIKE_POST });
          } else {
            // Post can be disliked
            post.likes = post.likes.filter(
              like => like.user.toString() !== req.user.id
            );

            post
              .save()
              .then(post => res.json(post))
              .catch(err => {
                console.log(err);

                return res
                  .status(500)
                  .json({ error: msg.ERROR_INTERNAL_ERROR });
              });
          }
        } else {
          return res.status(404).json({ error: msg.fieldNotFound("post") });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

// @route POST /api/posts/comment/:post_id
// @desc Add comment to post
// @access Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
      .then(post => {
        if (post) {
          // Post found, validate

          // Create comment
          const newComment = {
            user: res.user.id,
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar
          };

          post.comments.unshift(newComment);

          post
            .save()
            .then(post => res.json(post))
            .catch(err => {
              console.log(err);

              return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
            });
        } else {
          // Post not found
          return res.status(404).json({ error: msg.fieldNotFound("post") });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

// @route DELETE /api/posts/comment/:post_id/:comment_id
// @desc Delete comment
// @access Private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (post) {
          // Post found
          const indexToRemove = post.comments.findIndex(
            comment => comment.id.toString() === req.params.comment_id
          );

          if (indexToRemove !== -1) {
            // Comment found
            if (post.comments[indexToRemove].user.toString() === req.user.id) {
              // Requesting user is the comment's author - delete comment
              post.comments.splice(indexToRemove, 1);

              post
                .save()
                .then(post => res.json(post))
                .catch(err => {
                  console.log(err);

                  return res
                    .status(500)
                    .json({ error: msg.ERROR_INTERNAL_ERROR });
                });
            } else {
              return res.status(403).json(msg.ERROR_USER_NOT_AUTHORIZED);
            }
          } else {
            return res
              .status(404)
              .json({ error: msg.fieldNotFound("comment") });
          }
        } else {
          return res.status(404).json({ error: msg.fieldNotFound("post") });
        }
      })
      .catch(err => {
        console.log(err);

        return res.status(500).json({ error: msg.ERROR_INTERNAL_ERROR });
      });
  }
);

module.exports = router;
