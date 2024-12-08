const express = require('express');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/course-names').get(courseController.getCoursesNameOnly);

router
  .route('/')
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);

router
  .route('/:courseid')
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
