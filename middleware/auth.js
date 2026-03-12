const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //get token
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token found, authorization denied' });
  }

  //verify token
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res
        .status(500)
        .json({ msg: 'Server misconfiguration: JWT_SECRET not set' });
    }
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
