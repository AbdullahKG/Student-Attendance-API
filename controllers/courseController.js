const { Course } = require('../models/centralizedExports');

exports.getAllCourses = async (req, res) => {
  try {
    const course = await Course.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create({
      coursename: req.body.coursename,
    });

    res.status(201).json({
      status: 'success',
      data: {
        newCourse,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.courseid);

    res.status(200).json({
      status: 'success',
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const [updatedRows] = await Course.update(
      { coursename: req.body.coursename },
      {
        where: {
          courseid: req.params.courseid,
        },
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Course updated successfully!',
      rowsAffected: updatedRows,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deletedRows = await Course.destroy({
      where: {
        courseid: req.params.courseid,
      },
    });

    res.status(200).json({
      status: 'successful',
      message: `Course with courseid = (${req.params.courseid}) deleted succesfuly`,
      rowsAffected: deletedRows,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
    console.log(err);
  }
};
