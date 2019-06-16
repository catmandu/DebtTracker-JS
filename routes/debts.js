const router = require('express').Router();
const auth = require('../middleware/auth');
const userCheck = require('../middleware/userCheck');

const Debt = require('../models/Debt');

// Get all or a single record for a user
router.get('/', [auth, userCheck], async (req, res) => {
  try {
    const { debtName } = req.query;
    const { user } = res.locals.user;

    let results = debtName
      ? await Debt.find({ name: debtName, user })
      : await Debt.find({ user });

    if (results && results.length > 0) {
      return res.json(results);
    } else {
      return res.status(404).send('No data found');
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

// Registers a new record with the posted data
router.post('/', [auth, userCheck], async (req, res) => {
  try {
    const { name, amount, nextPayDay, description } = req.body;

    let debt = new Debt({
      name,
      description,
      amount,
      nextPayDay,
      user: res.locals.user
    });

    await debt.save();
    return res.json({ msg: 'debt inserted', debt });
  } catch (error) {
    console.error(`Error ocurred: ${error.message}`);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
