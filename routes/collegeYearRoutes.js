const express = require('express');
const collegeYearController = require('../controllers/collegeYearController');

const router = express.Router();

router
  .route('/')
  .get(collegeYearController.getAllCollegeYears)
  .post(collegeYearController.createCollegeYear);

router
  .route('/:yearid')
  .get(collegeYearController.getCollegeYear)
  .patch(collegeYearController.updateCollegeYear)
  .delete(collegeYearController.deleteCollegeYear);

module.exports = router;
