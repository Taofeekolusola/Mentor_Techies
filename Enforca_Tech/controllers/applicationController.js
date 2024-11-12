const { Application } = require('../models/Application');
const { Job } = require('../models/Job');

//desc apply for job role
//route POST /applications/apply
//access private
const applyForJob = async (req, res) => {
  try {
    // getting jobId from the request body
    const { jobId } = req.body;
    const userId = req.user.id;
      
    // Check if the job exists
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if the user has already applied for this job
    const existingApplication = await Application.findOne({
      where: {
        userId,
        jobId,
      }
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }

    // Create a new application
    const application = await Application.create({
      userId,
      jobId,
      status: 'pending', // Default status
    });

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

//desc get total application count
//route POST /applications/total
//access private
const getTotalApplications = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const totalApplications = await Application.count({
        where: { userId }
      });
  
      res.status(200).json({ totalApplications });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
//desc get total pending applications count
//route POST /applications/pending
//access private
const getTotalPendingApplications = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const totalPendingApplications = await Application.count({
        where: {
          userId,
          status: 'pending'
        }
      });
  
      res.status(200).json({ totalPendingApplications });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
//desc get total rejected applications count
//route POST /applications/pending
//access private
const getTotalRejectedApplications = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const totalRejectedApplications = await Application.count({
        where: {
          userId,
          status: 'rejected'
        }
      });
  
      res.status(200).json({ totalRejectedApplications });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
//desc get total accepted applications count
//route POST /applications/pending
//access private
const getTotalAcceptedApplications = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const totalAcceptedApplications = await Application.count({
        where: {
          userId,
          status: 'accepted'
        }
      });
  
      res.status(200).json({ totalAcceptedApplications });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
  
module.exports = {
    applyForJob,
    getTotalApplications,
    getTotalPendingApplications,
    getTotalRejectedApplications,
    getTotalAcceptedApplications
}