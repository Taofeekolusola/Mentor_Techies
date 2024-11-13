const { Interview } = require('../models/Interview');

//desc creates user interview
// route POST /interviews
//access private
const createInterview = async (req, res) => {
  try {
    const { userId, date, type, status } = req.body;
      const interview = await Interview.create({
          userId,
          date: new Date(date),
          type,
          status
      });
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//desc gets all interviews for a user
//route GET /interviews/:user
//access private
const getUserInterviewCount = async (req, res) => {
    try {
      const { userId } = req.params;
        const interviewCount = await Interview.count({
            where: { userId }
        });
        res.json({
            userId, interviewCount
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
  };

module.exports = {
    createInterview,
    getUserInterviewCount
};