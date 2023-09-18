const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }

  jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Add the decoded user ID to the request object for use in the controllers
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
