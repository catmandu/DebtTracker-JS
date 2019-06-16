const User = require('../models/User');

module.exports = async (req, res, next) => {
  const name = req.query.userName.toUpperCase();

  // Check if the username was provided
  if (name && name !== '' && name !== null) {
    let user = await User.findOne({ name });

    // Check if user provided exists
    if (user) {
      res.locals.user = user;
      next();
    } else {
      return res.status(404).send('User provided not found');
    }
  } else {
    return res.status(400).send('No user provided');
  }
};
