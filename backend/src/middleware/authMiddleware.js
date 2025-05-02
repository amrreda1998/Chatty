import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protectRoute = async (req, res, next) => {
  try {
    // 1. Extract token from cookies
    console.log('Cookies:', req.cookies); // Add this to debug
    const token = req.cookies.jwt;

    // 2. Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - No Token Provided',
      });
    }

    // 3. Verify token and return payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Invalid Token',
      });
    }

    // 4. Find user and exclude password
    const user = await User.findById(decoded.userId).select('-password');

    // 5. Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - User not found',
      });
    }

    // 6. Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
