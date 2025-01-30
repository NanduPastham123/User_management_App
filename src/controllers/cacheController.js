const redisClient = require('../config/redis.js');

// Invalidate cache after creating/updating/deleting a user
const invalidateUserCache = (userId) => {
    redisClient.del(`user:${userId}`); // Remove individual user cache
    redisClient.del('users'); // Remove all users cache
};

// get cache based user request
const getCache = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data;
    } catch (error) {
        console.error("Redis GET Error:", error);
        return null;
    }
};

// Store data in cache with expiry and  Helper function to set cache with a timeout of 3600 seconds (1 hour)
const setCache = async (key, value, expiry = 60) => {
    try {
        await redisClient.setEx(key, expiry, JSON.stringify(value));
        console.log(`Cache SET for ${key} (expires in ${expiry} sec)`);
    } catch (error) {
        console.error("Redis SET Error:", error);
    }
};

module.exports = { setCache, getCache, invalidateUserCache }