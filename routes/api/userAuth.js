const express = require("express");
const router = express.Router();

// @route  GET api/user/test
// @desc   Testing route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "This is a test..." }));

module.exports = router;
