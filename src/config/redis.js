const redis = require('redis');

const redisClient = redis.createClient({
  url: "redis://127.0.0.1:6379", // Explicit IPv4 address to avoid "::1" issues
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

(async () => {
  try {
    await redisClient.connect(); // Ensure the client is connected
    console.log("Redis connection established");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
})();

module.exports = redisClient;
