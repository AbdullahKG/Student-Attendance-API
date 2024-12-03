const express = require('express');
const cors = require('cors');
require('./arduino/serialReader');
const courseRoutes = require('./routes/courseRoutes');
const groupRoutes = require('./routes/groupRoutes');
const collegeYearRoutes = require('./routes/collegeYearRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRecordRoutes');
const userRoutes = require('./routes/userRoutes');
const globalErrorHandling = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

// 1) middlewares
app.use(express.json({ limit: '10kb' }));
app.use(express.static(`${__dirname}/public`));
app.use(
  cors({
    origin: 'http://localhost:3000', // client side url
    credentials: true, // Enable sending cookies
  })
);

// 2) routes
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/groups', groupRoutes);
app.use('/api/v1/collegeYears', collegeYearRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/attendances', attendanceRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandling);

module.exports = app;
