const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/count/:departmentid', studentController.countAllStudents);

router
  .route('/')
  .get(studentController.getAllStudents)
  .post(studentController.CreateStudent);

router
  .route('/:studentid')
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);

module.exports = router;
