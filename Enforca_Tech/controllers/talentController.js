const { Talent } = require('../models/Talent');
const { User } = require('../models/User');

//desc create user talent
//route POST /talents/user/:userId
//access private
const createTalent = async (req, res) => {
  try {
    const { userId } = req.params;
    const { expertise, name } = req.body;

    // Check if User exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if Talent already exists for this User
    const existingTalent = await Talent.findOne({ where: { userId } });
    if (existingTalent) {
      return res.status(400).json({ message: 'Talent already exists for this user' });
    }

    // Create new Talent for the User
    const talent = await Talent.create({ userId, expertise, name });
    res.status(201).json(talent);
  } catch (error) {
    console.error('Error creating talent:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//desc updates user talent
//route PUT /talents/user/:userId
//access private
const updateTalent = async (req, res) => {
    try {
      const { userId } = req.params;
      const { expertise, name } = req.body;
  
      // Find the Talent associated with the User
      const talent = await Talent.findOne({ where: { userId } });
      if (!talent) {
        return res.status(404).json({ message: 'Talent not found for this user' });
      }
  
      // Update Talent expertise
        talent.expertise = expertise;
        talent.name = name;
      await talent.save();
  
      res.json(talent);
    } catch (error) {
      console.error('Error updating talent:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

//desc get user talent
//route GET /talents/user/:userId
//access private

const getTalentExpertise = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find talent based on userId, fetching name and expertise directly
    const talent = await Talent.findOne({
      where: { userId },
      attributes: ['name', 'expertise'] // Fetch 'name' and 'expertise' from Talent
    });

    // Check if talent exists
    if (!talent) {
      return res.status(404).json({ message: 'Talent not found for the specified user' });
    }

    // Respond with name and expertise
    res.json({
      name: talent.name,
      expertise: talent.expertise
    });
  } catch (error) {
    console.error("Error fetching talent expertise:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    getTalentExpertise,
    createTalent,
    updateTalent,
};