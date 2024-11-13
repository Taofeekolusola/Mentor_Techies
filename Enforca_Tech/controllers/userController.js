const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
const config = require('../config/config');
const nodemailer = require('nodemailer');

//desc register a user
//route post /auth/register
//access public
const register = async (req, res) => {
const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new user
    const user = await User.create({ name, email, password });
    
    // Ensures name is provided ad that it's a string
    if (!name || typeof name !== 'string') { 
      return res.status(400).json({
        message: 'Invalid name. Name is required and it must be a string.'
      });
    }
    
    // Ensures email is provided ad that it's a string and contains '@'
    if (!email || typeof email!== 'string' ||!email.includes('@')) { 
      return res.status(400).json({
        message: 'Invalid email. Email is required and it must be a valid email address.'
      });
    }

    // Ensures password is provided ad that it's a string and at least 8 characters long
    if (!password || typeof password!== 'string' || password.length < 8) { 
      return res.status(400).json({
        message: 'Invalid password. Password is required and it must be at least 8 characters long.'
      });
    }

    // Return the user
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Could not create user.' });
  }
};

//desc update user profile
//route PUT /auth/delete
//access private
const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    // Ensures name is provided ad that it's a string
    if (!name || typeof name !== 'string') { 
      return res.status(400).json({
        message: 'Invalid name. Name is required and it must be a string.'
      });
    }
    
    // Ensures email is provided ad that it's a string and contains '@'
    if (!email || typeof email!== 'string' ||!email.includes('@')) { 
      return res.status(400).json({
        message: 'Invalid email. Email is required and it must be a valid email address.'
      });
    }
    
    // Ensures password is provided ad that it's a string and at least 8 characters long
    if (!password || typeof password!== 'string' || password.length < 8) { 
      return res.status(400).json({
        message: 'Invalid password. Password is required and it must be at least 8 characters long.'
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile
    user.name = name;
    user.email = email;

    // Hash the password if it has been provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });

  } catch (error) {
    console.error(err);
    res.status(500).json({
      message: 'Server error. Could not update user profile.'
    });
  }
 }

//desc delete user profile
//route DELETE /auth/delete
//access private
const deleteUser = async (req, res) => { 
  try {
    const { id } = req.params

    if (typeof id!== 'string') {
        return res.status(400).json({
            msg: 'Invalid user id, id must be a string'
        });
    }
    console.log("===========", typeof id)
    const user = await User.findByPk(id) 

    if (!user) {
        return res.status(400).json('user not found')
    }

    await user.destroy()
    res.status(200).json('User deleted')
    
} catch (error) {
    res.status(404).json({
        message: error.message
    });
}
}

//desc get total user
//route GET /auth/total
//access private
const getTotalUsers = async (req, res) => {
  try {
    // Use Sequelize's count method to get the total number of users
    const totalUsers = await User.count();
    res.status(200).json({ totalUsers });
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ error: "An error occurred while fetching the total number of users" });
  }
};

//desc login a user
//route post /auth/login
//access public
const login = async (req, res) => {
  const {email, password} = req.body;

    const user = await User.findOne({ where: {email}})
    if (!user) {
        return res.status(401).json({ 
            message: 'Invalid email' 
        });    
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(401).json({ 
            message: 'Invalid password'
        });
    }
    const payload = {
        id: user.id,
        email: user.email,
    }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '7d'}) 
    res.status(201).json({ 
        token 
    })
};


//desc resets user's password
//route
//access private
const sendEmail = async (email, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  await transporter.sendMail(mailOptions);
  
  // implement actual email sending in production.
  console.log("reset link " , resetLink)
};

//desc request password reset (send reset link)
//route
//access private
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token
    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });

    // Construct the reset link
    const resetLink = `http://localhost:5002/auth/reset/${token}`;

    // Send the reset link to the user's email
    await sendEmail(user.email, resetLink);

    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//desc resets a user password
//route post /auth/reset
//access private
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify the token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Find the user by the ID from the decoded token
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  requestPasswordReset,
  sendEmail,
  resetPassword,
  deleteUser,
  updateUserProfile,
  getTotalUsers,
};