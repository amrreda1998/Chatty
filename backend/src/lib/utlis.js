import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  // Set JWT as HTTP-Only cookie
  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Prevents client-side access (XSS)
    sameSite: 'strict', // CSRF protection
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    path: '/', // Cookie is available for all routes
  });
  return token;
};
