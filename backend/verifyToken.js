import jwt from 'jsonwebtoken';

<<<<<<< HEAD

const verifyToken = (req, res, next) => {
 
=======
// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
  // Check if the token is provided in the Authorization header
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

<<<<<<< HEAD
  const token = authHeader.split(' ')[1]; 

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); 
    req.user = decoded; 
    next();
=======
  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace with your secret key
    req.user = decoded; // Store the decoded token info in the request object
    next(); // Move to the next middleware or route handler
>>>>>>> 116737f30caac5c59e0985afd25f55fc9ab928a4
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

export default verifyToken;
