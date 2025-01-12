const express = require('express');
const attendanceController = require('../controllers/attendanceRecordController');

const router = express.Router();

router.get('/student-attendance' , attendanceController.getStudentAttendnace)
router.post('/create-absent', attendanceController.createAbsent);
router.get('/:departmentid', attendanceController.countAllAttendances);

router
  .route('/')
  .get(attendanceController.getAllAttendances)
  .post(attendanceController.CreateAttendance);

module.exports = router;
