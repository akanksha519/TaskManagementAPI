const Task = require('../models/taskModel');

// Get all tasks
exports.getTasks = async (req, res, next) => {
  try {
    const { status, priority, sort, limit, skip } = req.query;

    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .sort(sort ? { [sort]: 1 } : {})
      .skip(Number(skip) || 0)
      .limit(Number(limit) || 10);

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

// Get task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// Update a task
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
