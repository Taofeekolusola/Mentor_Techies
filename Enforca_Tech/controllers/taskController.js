const { Task } = require('../models/Task');
const { Op } = require('sequelize');

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.user.id;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get daily tasks for the user
const getDailyTasksCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentDate = new Date();

    // Get start and end of today
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

    // Count tasks created by the user today
    const taskCount = await Task.count({
      where: {
        userId,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    res.status(200).json({ dailyTaskCount: taskCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTask, getDailyTasksCount };