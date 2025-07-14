const axios = require("axios");

const LOG_API = "http://20.244.56.144/evaluation-service/logs";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGFrdGlyYW0uY29jQGdtYWlsLmNvbSIsImV4cCI6MTc1MjQ3MDg1OCwiaWF0IjoxNzUyNDY5OTU4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjM3MzhlM2QtN2E2ZS00NGVlLWFlMzAtNWEwYjc4YzY4ZGZjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2hha3RpIHByYXNhZCByYW0iLCJzdWIiOiJlNzJkZjUwYy00MzE1LTQyOGYtYTZmMi0wZTZjMTMwNjk0M2QifSwiZW1haWwiOiJzaGFrdGlyYW0uY29jQGdtYWlsLmNvbSIsIm5hbWUiOiJzaGFrdGkgcHJhc2FkIHJhbSIsInJvbGxObyI6IjEyMjA1NzA5IiwiYWNjZXNzQ29kZSI6IkNaeXBRSyIsImNsaWVudElEIjoiZTcyZGY1MGMtNDMxNS00MjhmLWE2ZjItMGU2YzEzMDY5NDNkIiwiY2xpZW50U2VjcmV0IjoibXBnUXV5VlNjVHhFdnR6RCJ9.KSyIhfJ_Y4rf8cunFY97xgEzGXGosBgmgcLk2GmMCLs";

function Log(stack, level, pkg, message) {
  axios
    .post(
      LOG_API,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: AUTH_TOKEN,
          "Content-Type": "application/json",
        },
      }
    )
    .catch(() => {});
}

module.exports = Log;
