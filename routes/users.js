const router = require('express').Router();
const auth = require('../middleware/auth');

const User = require('../models/User');

// Get all users or a specific one
router.get('/', auth, async (req, res) => {
  try {
    const user = req.query.userName && {
      name: req.query.userName.toUpperCase()
    };
    let results = await User.find(user);

    if (results && results.length > 0) {
      return res.json(results);
    } else {
      return res.status(404).send('No data found');
    }
  } catch (error) {
    console.error(`Error ocurred: ${error.message}`);
    return res.status(500).send('Server error');
  }
});

// Create a new user
router.post('/', auth, async (req, res) => {
  try {
    req.body.name = req.body.name.toUpperCase();
    let user = await User.findOne(req.body);

    if (user) {
      return res.status(400).send('User already registered');
    } else {
      user = new User(req.body);
      await user.save();
      return res.json(user);
    }
  } catch (error) {
    console.error(`Error ocurred: ${error.message}`);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
