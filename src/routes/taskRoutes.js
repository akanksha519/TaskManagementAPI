const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// POST /api/tasks - Create a new task
router.post("/", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  try {
    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

module.exports = router;
