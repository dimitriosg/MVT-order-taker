// authMiddleware.js
// Desc: Middleware for authenticating user
import jwt from 'jsonwebtoken';

const { TokenExpiredError, JsonWebTokenError } = jwt;


export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log("Token:", token);

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({ message: 'Token could not be decoded' });
    }

    req.user = decoded;  // Store the user ID and other payload info in req.user
    console.log('Decoded JWT:', decoded);
    next();

  } catch (error) {
    if(err instanceof TokenExpiredError) {
      return res.status(401).send('Token expired');
    }

    if(err instanceof JsonWebTokenError) {
      return res.status(401).send('Invalid token'); 
    }

    console.error('Error in authMiddleware:', error);
    res.status(401).json({ message: 'Please authenticate.' });
  }
  next();
};
