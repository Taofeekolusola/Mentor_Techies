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