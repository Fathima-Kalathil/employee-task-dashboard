const router = require('express').Router();
const Task = require('../models/Task');

const pick = ({ title, description, assignedTo, priority, dueDate, status }) => ({
  title,
  description,
  assignedTo: assignedTo || null,
  priority,
  dueDate: dueDate || null,
  status,
});

router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.employee) filter.assignedTo = req.query.employee;
  res.json(await Task.find(filter).populate('assignedTo', 'name email').sort({ createdAt: -1 }));
});

router.post('/', async (req, res) => {
  const task = await Task.create(pick(req.body));
  res.status(201).json(await task.populate('assignedTo', 'name email'));
});

router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, pick(req.body), {
    new: true,
    runValidators: true,
  }).populate('assignedTo', 'name email');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

router.patch('/:id/status', async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  ).populate('assignedTo', 'name email');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
