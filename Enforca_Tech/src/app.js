const dotenv = require('dotenv')
const express = require('express');
const cors = require('cors');
const testRouter = require('../routes/testRoute')
const userRoutes = require('../routes/userRoute');
const jobRoutes = require('../routes/jobRoute');
const searchRoutes = require('../routes/searchRoute');
const taskRoutes = require('../routes/taskRoute');
const uploadRoutes = require('../routes/uploadCvRoute');
const applicationRoutes = require('../routes/applicationRoute');
const talentRoutes = require('../routes/talentRoute');
const interviewRoutes = require('../routes/interviewRoute');

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
app.use('/auth', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/search', searchRoutes);
app.use('/tasks', taskRoutes);
app.use('/upload', uploadRoutes);
app.use('/applications', applicationRoutes);
app.use('/talents', talentRoutes);
app.use('/interviews', interviewRoutes);

module.exports = app;