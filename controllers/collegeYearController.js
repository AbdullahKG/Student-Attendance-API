const { where } = require('sequelize');
const { CollegeYear } = require('../models/centralizedExports');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllCollegeYears = catchAsync(async (req, res, next) => {
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
});

exports.createCollegeYear = catchAsync(async (req, res, next) => {
  const newCollegeYear = await CollegeYear.create({
    yearname: req.body.yearname,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newCollegeYear,
    },
  });
});

exports.getCollegeYear = catchAsync(async (req, res, next) => {
  const collegeYear = await CollegeYear.findByPk(req.params.yearid);

  if (!collegeYear) {
    return next(
      new AppError(
        `there is no college year with this id ${req.params.yearid}`,
        404
      )
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      collegeYear,
    },
  });
});

exports.updateCollegeYear = catchAsync(async (req, res, next) => {
  const [updatedRows] = await CollegeYear.update(
    { yearname: req.body.yearname },
    {
      where: {
        yearid: req.params.yearid,
      },
    }
  );

  if (!updatedRows) {
    return next(new AppError('no rows were updated', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'College Year updated successfully!',
    rowsAffected: updatedRows,
  });
});

exports.deleteCollegeYear = catchAsync(async (req, res, next) => {
  const deletedRows = await CollegeYear.destroy({
    where: {
      yearid: req.params.yearid,
    },
  });

  if (!deletedRows) {
    return next(new AppError('no rows were deleted', 404));
  }

  res.status(200).json({
    status: 'successful',
    message: `College Year with yearid = (${req.params.yearid}) deleted succesfuly`,
    rowsAffected: deletedRows,
  });
});
