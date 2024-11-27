const { where } = require('sequelize');
const { CollegeYear } = require('../models/centralizedExports');

exports.getAllCollegeYears = async (req, res) => {
  try {
    const collegeYear = await CollegeYear.findAll({
      attributes: ['yearid', 'yearname'],
    });

    res.status(200).json({
      status: 'successful',
      result: collegeYear.length,
      data: {
        collegeYear,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCollegeYear = async (req, res) => {
  try {
    const newCollegeYear = await CollegeYear.create({
      yearname: req.body.yearname,
    });

    res.status(201).json({
      status: 'success',
      data: {
        newCollegeYear,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getCollegeYear = async (req, res) => {
  try {
    const collegeYear = await CollegeYear.findByPk(req.params.yearid);

    res.status(200).json({
      status: 'success',
      data: {
        collegeYear,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateCollegeYear = async (req, res) => {
  try {
    const [updatedRows] = await CollegeYear.update(
      { yearname: req.body.yearname },
      {
        where: {
          yearid: req.params.yearid,
        },
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'College Year updated successfully!',
      rowsAffected: updatedRows,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCollegeYear = async (req, res) => {
  try {
    const deletedRows = await CollegeYear.destroy({
      where: {
        yearid: req.params.yearid,
      },
    });

    res.status(200).json({
      status: 'successful',
      message: `College Year with yearid = (${req.params.yearid}) deleted succesfuly`,
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
