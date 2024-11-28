const { where } = require('sequelize');
const { Department } = require('../models/centralizedExports');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllDepartments = catchAsync(async (req, res, next) => {
  const department = await Department.findAll({
    attributes: ['departmentid', 'departmentname'],
  });

  res.status(200).json({
    status: 'successful',
    result: department.length,
    data: {
      department,
    },
  });
});

exports.createDepartment = catchAsync(async (req, res, next) => {
  const newDepartment = await Department.create({
    departmentname: req.body.departmentname,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newDepartment,
    },
  });
});

exports.getDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findByPk(req.params.departmentid);

  if (!department) {
    return next(
      new AppError(
        `there is no department with this id ${req.params.departmentid}`,
        404
      )
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      department,
    },
  });
});

exports.updateDepartment = catchAsync(async (req, res, next) => {
  const [updatedRows] = await Department.update(
    { departmentname: req.body.departmentname },
    {
      where: {
        departmentid: req.params.departmentid,
      },
    }
  );

  if (!updatedRows) {
    return next(new AppError('no rows were updated', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Department updated successfully!',
    rowsAffected: updatedRows,
  });
});

exports.deleteDepartment = catchAsync(async (req, res, next) => {
  const deletedRows = await Department.destroy({
    where: {
      departmentid: req.params.departmentid,
    },
  });

  if (!deletedRows) {
    return next(new AppError('no rows were deleted', 404));
  }

  res.status(200).json({
    status: 'successful',
    message: `Department with departmentid = (${req.params.departmentid}) deleted succesfuly`,
    rowsAffected: deletedRows,
  });
});
