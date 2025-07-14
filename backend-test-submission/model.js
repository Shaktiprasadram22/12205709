const urls = new Map();

function addUrl(shortcode, longUrl, validity) {
  const now = new Date();
  const expiry = new Date(now.getTime() + validity * 60000);
  urls.set(shortcode, {
    longUrl,
    createdAt: now,
    expiry,
    clickCount: 0,
    clicks: [],
  });
  return expiry;
}

function getUrl(shortcode) {
  return urls.get(shortcode);
}

function addClick(shortcode, referrer, ip) {
  const data = urls.get(shortcode);
  if (data) {
    data.clickCount += 1;
    data.clicks.push({
      timestamp: new Date(),
      referrer: referrer || "",
      location: ip || "",
    });
  }
}

function getStatsData(shortcode) {
  const data = urls.get(shortcode);
  if (!data) return null;
  return {
    originalUrl: data.longUrl,
    createdAt: data.createdAt,
    expiry: data.expiry,
    totalClicks: data.clickCount,
    clicks: data.clicks,
  };
}

module.exports = { urls, addUrl, getUrl, addClick, getStatsData };
