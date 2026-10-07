const router = require('express').Router();
const Employee = require('../models/Employee');
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  const [employees, total, pending, inProgress, completed] = await Promise.all([
    Employee.countDocuments(),
    Task.countDocuments(),
    Task.countDocuments({ status: 'pending' }),
    Task.countDocuments({ status: 'in-progress' }),
    Task.countDocuments({ status: 'completed' }),
  ]);
  res.json({ employees, total, pending, inProgress, completed });
});

module.exports = router;
