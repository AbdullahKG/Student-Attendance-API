const { User, Department, sequelize } = require('../models/centralizedExports');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { hashPasword } = require('../utils/passwordHashingAndComparing');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.findAll({
    attributes: [
      'userid',
      'username',
      'role',
      [sequelize.col('department.departmentname'), 'departmentName'],
    ],
    include: [
      {
        model: Department,
        attributes: [],
        required: true,
      },
    ],
    where: {
      departmentid: req.query.departmentid,
    },
    raw: true,
  });

  res.status(200).json({
    status: 'successful',
    result: user.length,
    data: {
      user,
    },
  });
});

exports.countAllUsers = catchAsync(async (req, res, next) => {
  const departmentid = req.params.departmentid;

  const totalUser = await User.findAll({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('userid')), 'totalUsers'],
    ],
    where: {
      departmentid: departmentid,
    },
    raw: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      totalUser,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const hashedPassword = await hashPasword(req.body.password);

  const newUser = await User.create({
    username: req.body.username,
    password: hashedPassword,
    role: req.body.role,
    departmentid: req.body.departmentId,
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
    return next(new AppError('now rows were updated', 200));
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
