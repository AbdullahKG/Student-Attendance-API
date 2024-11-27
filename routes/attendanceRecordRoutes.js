const express = require('express');
const attendanceController = require('../controllers/attendanceRecordController');

const router = express.Router();

router
  .route('/')
  .get(attendanceController.getAllAttendances)
  .post(attendanceController.CreateAttendance);

module.exports = router;
