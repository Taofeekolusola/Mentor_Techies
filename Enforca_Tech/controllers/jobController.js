const { Job } = require('../models/Job');
const {User} = require('../models/User');

//desc create a user
//route post /jobs
//access private
const createJob = async (req, res) => {
  const { userId, title, description } = req.body;

  try {
    // Validate title
    if (!title || typeof title !== 'string') { 
      return res.status(400).json({ message: 'Invalid title. Title must be provided and it must be a string.' });
    }

    // Validate description
    if (description && typeof description !== 'string') { 
      return res.status(400).json({ message: 'Invalid description. Description must be a string.' });
    }

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'Invalid user id. User id must be provided.' });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the job associated with the user
    const job = await Job.create({
      title,
      description,
      userId,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating job' });
  }
};


//desc retrieves a user
//route GET /jobs
//access private
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving jobs'
    });
  }
};

module.exports = {
  createJob,
  getJobs
};