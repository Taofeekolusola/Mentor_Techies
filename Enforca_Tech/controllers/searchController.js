const { User } = require('../models/User');
const { Job } = require('../models/Job');
const {Op} = require('sequelize')

//desc search for jobs
//route post /users/search
//access public
const searchUsers = async (req, res) => {
  try {
    
    const { name, email, isActive } = req.query;
    
    if (typeof name !== 'string') { 
          return res.status(400).json({ message: 'Invalid name. Name must be a string.' });
    }
      
      if (typeof email !== 'string') { 
          return res.status(400).json({ message: 'Invalid email. Email must be a string.' });
    }
      
    const whereClause = {};
    if (name) whereClause.name = { [Op.iLike]: `%${name}%` };
    if (email) whereClause.email = { [Op.iLike]: `%${email}%` };
    if (isActive) whereClause.isActive = isActive === 'true';

    const users = await User.findAll({ where: whereClause });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//desc search for jobs
//route post /search
//access public
const searchJobs = async (req, res) => { 
    try {
      const { title, description, isActive } = req.query;

      const whereClause = {};
      if (title) whereClause.title = { [Op.iLike]: `%${title}%` };
      if (description) whereClause.location = { [Op.iLike]: `%${location}%` };
      if (isActive) whereClause.isActive = isActive === 'true';

      const jobs = await Job.findAll({ where: whereClause });
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
 
 } 
module.exports = {
    searchUsers,
    searchJobs
};