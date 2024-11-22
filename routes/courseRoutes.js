const express = require('express');
const courseControler = require('../controllers/courseController');

const router = express.Router();

router
  .route('/')
  .get(courseControler.getAllCourses)
  .post(courseControler.createCourse);

router
  .route('/:courseid')
  .get(courseControler.getCourse)
  .patch(courseControler.updateCourse)
  .delete(courseControler.deleteCourse);

module.exports = router;
