const dotenv = require('dotenv')
const express = require('express');
const cors = require('cors');
const testRouter = require('../routes/testRoute')
const authRoutes = require('../routes/authRoute');
const jobRoutes = require('../routes/jobRoute');
const searchRoutes = require('../routes/searchRoute');
const taskRoutes = require('../routes/taskRoute');
const uploadRoutes = require('../routes/uploadCvRoute');

const app = express();

dotenv.config();

// Middleware
const corsOptions = {
    origin: 'https://greenmark.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}


// Routes
app.use(cors(corsOptions))
app.use(express.json());
app.use('/test', testRouter);
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/search', searchRoutes);
app.use('/tasks', taskRoutes);
app.use('/upload', uploadRoutes);

module.exports = app;