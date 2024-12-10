const { Student, sequelize } = require('../models/centralizedExports');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj) => {
  // Filter out undefined fields from the request body
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj.body[key] !== undefined) {
      newObj[key] = obj.body[key];
    }
  });

  return newObj;
};

exports.getAllStudents = catchAsync(async (req, res, next) => {
  const student = await Student.findAll();

  res.status(200).json({
    status: 'success',
    data: {
      student,
    },
  });
});

exports.countAllStudents = catchAsync(async (req, res, next) => {
  const departmentid = req.params.departmentid;

  const totalStudent = await Student.findAll({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('studentid')), 'totalStudents'],
    ],
    where: {
      departmentid: departmentid,
    },
    raw: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      totalStudent,
    },
  });
});

exports.CreateStudent = catchAsync(async (req, res, next) => {
  const newStudent = await Student.create({
    displayid: req.body.displayid,
    firstname: req.body.firstname,
    secondname: req.body.secondname,
    thirdname: req.body.thirdname,
    lastname: req.body.lastname,
    cardid: req.body.cardid,
    departmentid: req.body.departmentid,
    yearid: req.body.yearid,
    groupid: req.body.groupid,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newStudent,
    },
  });
});

exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByPk(req.params.studentid);

  if (!student) {
    return next(
      new AppError(`there is now student with id ${req.params.studentid}`)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      student,
    },
  });
});

exports.updateStudent = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body);

  // Perform the update only with the fields provided in the request
  const [updatedRows] = await Student.update(filteredBody, {
    where: {
      studentid: req.params.studentid,
    },
  });

  if (!updatedRows) {
    return next(new AppError('now rows were updated', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Student updated successfully!',
    rowsAffected: updatedRows,
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  const deletedRows = await Student.destroy({
    where: {
      studentid: req.params.studentid,
    },
  });

  if (!deletedRows) {
    return next(new AppError('now rows were updated', 404));
  }

  res.status(200).json({
    status: 'successful',
    message: `Student with studentid = (${req.params.student}) deleted succesfuly`,
    rowsAffected: deletedRows,
  });
});
