const router = require('express').Router();
const Employee = require('../models/Employee');
const Task = require('../models/Task');

const pick = ({ name, email, position, phone }) => ({ name, email, position, phone });

router.get('/', async (req, res) => {
  res.json(await Employee.find().sort({ createdAt: -1 }));
});

router.post('/', async (req, res) => {
  res.status(201).json(await Employee.create(pick(req.body)));
});

router.put('/:id', async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, pick(req.body), {
    new: true,
    runValidators: true,
  });
  if (!emp) return res.status(404).json({ message: 'Employee not found' });
  res.json(emp);
});

router.delete('/:id', async (req, res) => {
  const emp = await Employee.findByIdAndDelete(req.params.id);
  if (!emp) return res.status(404).json({ message: 'Employee not found' });
  await Task.updateMany({ assignedTo: emp._id }, { assignedTo: null }); // unassign their tasks
  res.json({ message: 'Employee deleted' });
});

module.exports = router;
