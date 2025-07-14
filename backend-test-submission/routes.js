const express = require("express");
const { createShortUrl, getStats, redirectShortUrl } = require("./service");

const router = express.Router();

router.post("/shorturls", createShortUrl);
router.get("/shorturls/:shortcode", getStats);
router.get("/:shortcode", redirectShortUrl);

module.exports = router;
