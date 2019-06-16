const config = require('config');

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).send('No token, authorization denied');
  } else if (token === config.get('secret')) {
    next();
  } else {
    return res.status(401).send('Token is not valid');
  }
};
