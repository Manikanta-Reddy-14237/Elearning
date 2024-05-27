// authorizeRole.js
import jwt from 'jsonwebtoken';

const authorizeRole = (roles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, 'your_secret_key');
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Access denied. You do not have the required role.' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }
  };
};

export default authorizeRole;
