const jwt = require('jsonwebtoken');
const User = require('../model/userModel'); 

// Middleware to protect routes and attach the user to req.user
const protect = async (req, res, next) => {
  let token;

  // Check if the token is present in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user from the decoded token to req.user
      req.user = await User.findById(decoded.id).select('-password'); // Exclude password from user object

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the header
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;
