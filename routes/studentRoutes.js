const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');

const router = express.Router();

// protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

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
