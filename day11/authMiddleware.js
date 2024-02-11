const jwt = require('jsonwebtoken');
const secretKey='secret-key';

function authenticationMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    } else {
      req.user = decoded;
      next();
    }
  });
}

module.exports = authenticationMiddleware;
