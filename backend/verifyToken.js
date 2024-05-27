import jwt from 'jsonwebtoken';

// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
  // Check if the token is provided in the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace with your secret key
    req.user = decoded; // Store the decoded token info in the request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

export default verifyToken;
