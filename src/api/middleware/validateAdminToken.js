const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateAdminToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith('dflex')) {
    const [, token] = authHeader.split(' ');
    jwt.verify(token, process.env.ACCESS_TOKEN_ADMIN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('User is not authorized');
      }
      if (decoded.user.role !== 'admin') {
        res.status(401);
        throw new Error('User is not authorized');
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(400);
      throw new Error('User is not authorized or token is missing');
    }
  } else {
    res.status(400);
    throw new Error('User is not authorized or token is missing');
  }
});

module.exports = validateAdminToken;
