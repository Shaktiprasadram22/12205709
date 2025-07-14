const { urls, addUrl, getUrl, addClick, getStatsData } = require("./model");
const { isValidUrl, generateShortcode, isValidShortcode } = require("./utils");
const Log = require("../logging-middleware/log");

const HOST = "http://localhost:3000";

function createShortUrl(req, res) {
  const { url, validity, shortcode } = req.body;
  if (!url || !isValidUrl(url)) {
    Log("backend", "error", "handler", "Invalid URL input");
    return res.status(400).json({ error: "Invalid URL" });
  }
  let code = shortcode;
  if (code) {
    if (!isValidShortcode(code)) {
      Log("backend", "error", "handler", "Invalid shortcode format");
      return res.status(400).json({ error: "Invalid shortcode" });
    }
    if (urls.has(code)) {
      Log("backend", "error", "handler", "Shortcode collision");
      return res.status(409).json({ error: "Shortcode already in use" });
    }
  } else {
    do {
      code = generateShortcode();
    } while (urls.has(code));
  }
  const validFor = typeof validity === "number" && validity > 0 ? validity : 30;
  const expiry = addUrl(code, url, validFor);
  Log("backend", "info", "controller", `Short URL created: ${code}`);
  res.status(201).json({
    shortLink: `${HOST}/${code}`,
    expiry: expiry.toISOString(),
  });
}

function redirectShortUrl(req, res) {
  const { shortcode } = req.params;
  const data = getUrl(shortcode);
  if (!data) {
    Log("backend", "error", "handler", "Shortcode not found");
    return res.status(404).json({ error: "Shortcode not found" });
  }
  if (Date.now() > data.expiry.getTime()) {
    Log("backend", "warn", "handler", "Shortcode expired");
    return res.status(410).json({ error: "Shortcode expired" });
  }
  addClick(shortcode, req.get("referer"), req.ip);
  Log("backend", "info", "controller", `Redirected: ${shortcode}`);
  res.redirect(data.longUrl);
}

function getStats(req, res) {
  const { shortcode } = req.params;
  const stats = getStatsData(shortcode);
  if (!stats) {
    Log("backend", "error", "handler", "Shortcode not found for stats");
    return res.status(404).json({ error: "Shortcode not found" });
  }
  Log("backend", "info", "controller", `Stats retrieved: ${shortcode}`);
  res.json(stats);
}

module.exports = { createShortUrl, redirectShortUrl, getStats };
