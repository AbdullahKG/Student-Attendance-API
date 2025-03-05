const express = require('express');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.route('/course-names').get(courseController.getCoursesNameOnly);

router.use(authController.protect, authController.restrictTo('admin'));
router.get('/count/:departmentid', courseController.countAllCourses);

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
