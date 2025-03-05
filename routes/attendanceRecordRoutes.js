const express = require('express');
const attendanceController = require('../controllers/attendanceRecordController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('student'));
router.get('/student-attendance', attendanceController.getStudentAttendnace);

router.use(authController.protect, authController.restrictTo('admin'));
router.get('/count/:departmentid', attendanceController.countAllAttendances);

router.use(authController.protect, authController.restrictTo('teacher'));
router.post('/create-absent', attendanceController.createAbsent);
router
  .route('/')
  .get(attendanceController.getAllAttendances)
  .post(attendanceController.CreateAttendance);

module.exports = router;
