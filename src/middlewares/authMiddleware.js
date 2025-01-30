const jwt = require("jsonwebtoken");
const User = require("../models/user");

const secret = process.env.JWT_SECRET;

// const signToken = (payload) => jwt.sign(payload, secret, { expiresIn: "1h" });

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
/**
 * This is middleware function to authenticate user based on the JWT token and return the true if valid
 * @param {*} req
 * @param {*} res
 * @returns [] 401 if invalid otherwise pass to API handler
 */
// Middleware to authenticate user based on JWT
const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
      //console.log('requested authorization token is missing')
      return res.status(401).json({ message: 'Missing Authorization Header' })
    }
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ error: "Access token missing" });
    }
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);
        console.log("CHECKuser::: " + user)
        if (!user) {
            return res.status(401).json({ message: 'Invalid token or user no longer exists' });
        }
    req.user = decoded;
    console.log("DECODED::", req.user);
    next();
  } catch (error) {
    console.log("ERROR::" + error)
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { verifyToken, authenticate };
