const express = require('express');
const router = express.Router();
const State = require('../models/states'); // Adjust the path to your model

// Route to get all states with their LGAs and Areas
router.get('/api/states', async (req, res) => {
  try {
    const states = await State.find().populate('localGovernments.areas');
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching states', error });
  }
});

module.exports = router;
