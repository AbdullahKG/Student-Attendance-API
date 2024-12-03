const { User } = require('../models/centralizedExports');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const hashPassword = require('../utils/passwordHashingAndComparing');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.findAll();

  res.status(200).json({
    status: 'successful',
    result: user.length,
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const hashedPassword = await hashPassword(req.body.password);

  const newUser = await User.create({
    username: req.body.username,
    password: hashedPassword,
    role: req.body.role,
    departmentid: req.body.departmentid,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newUser,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.userid);

  if (!user) {
    return next(
      new AppError(`there is no user for this id ${req.params.userid}`)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// this only update the username
exports.updateUser = catchAsync(async (req, res, next) => {
  const [updatedRows] = await User.update(
    { username: req.body.username },
    {
      where: {
        userid: req.params.userid,
      },
    }
  );

  if (!updatedRows) {
    return next(new AppError('now rows were updated', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully!',
    rowsAffected: updatedRows,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedRows = await User.destroy({
    where: {
      userid: req.params.userid,
    },
  });

  if (!deletedRows) {
    return next(new AppError('now rows were deleted', 404));
  }

  res.status(200).json({
    status: 'successful',
    message: `User with user id = (${req.params.userid}) deleted succesfuly`,
    rowsAffected: deletedRows,
  });
});
