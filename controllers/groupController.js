const { where } = require('sequelize');
const { Group } = require('../models/centralizedExports');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllGroups = catchAsync(async (req, res, next) => {
  const group = await Group.findAll({ attributes: ['groupid', 'grouptype'] });

  res.status(200).json({
    status: 'successful',
    result: group.length,
    data: {
      group,
    },
  });
});

exports.createGroup = catchAsync(async (req, res, next) => {
  const newGroup = await Group.create({
    grouptype: req.body.grouptype,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newGroup,
    },
  });
});

exports.getGroup = catchAsync(async (req, res, next) => {
  const group = await Group.findByPk(req.params.groupid);

  if (!group) {
    return next(
      new AppError(`there is no group for this id ${req.params.groupid}`)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      group,
    },
  });
});

exports.updateGroup = catchAsync(async (req, res, next) => {
  const [updatedRows] = await Group.update(
    { grouptype: req.body.grouptype },
    {
      where: {
        groupid: req.params.groupid,
      },
    }
  );

  if (!updatedRows) {
    return next(new AppError('now rows were updated', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Group updated successfully!',
    rowsAffected: updatedRows,
  });
});

exports.deleteGroup = catchAsync(async (req, res, next) => {
  const deletedRows = await Group.destroy({
    where: {
      groupid: req.params.groupid,
    },
  });

  if (!deletedRows) {
    return next(new AppError('now rows were deleted', 404));
  }

  res.status(200).json({
    status: 'successful',
    message: `Group with groupid = (${req.params.groupid}) deleted succesfuly`,
    rowsAffected: deletedRows,
  });
});
