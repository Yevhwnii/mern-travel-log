const router = require('express').Router();

const LogEntry = require('../models/LogEntry');

router.get('/', async (req, res) => {
  try {
    const logs = await LogEntry.find();
    res.json(logs);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const result = await logEntry.save();
    res.json({ message: 'Created!', log: result });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
