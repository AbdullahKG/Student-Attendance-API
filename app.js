const express = require('express');
const courseRoutes = require('./routes/courseRoutes');
const groupRoutes = require('./routes/groupRoutes');
const collegeYearRoutes = require('./routes/collegeYearRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// 1) middlewares
app.use(express.json({ limit: '10kb' }));
app.use(express.static(`${__dirname}/public`));

// 2) routes
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/groups', groupRoutes);
app.use('/api/v1/collegeYears', collegeYearRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/students', studentRoutes);

module.exports = app;
