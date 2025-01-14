const {
  Student,
  Department,
  CollegeYear,
  Group,
  sequelize,
} = require('../models/centralizedExports');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllStudents = catchAsync(async (req, res, next) => {
  const students = await Student.findAll({
    attributes: [
      ['studentid', 'realID'],
      ['displayid', 'ID'],
      [
        sequelize.fn(
          'concat',
          sequelize.col('firstname'),
          ' ',
          sequelize.col('secondname'),
          ' ',
          sequelize.col('thirdname'),
          ' ',
          sequelize.col('lastname')
        ),
        'studentName',
      ],
      'cardid',
      [sequelize.col('group.grouptype'), 'groupname'],
      [sequelize.col('collegeYear.yearname'), 'year'],
      [sequelize.col('department.departmentname'), 'departmentname'],
      'userid',
    ],
    include: [
      {
        model: CollegeYear,
        attributes: [],
        required: true,
      },
      {
        model: Department,
        attributes: [],
        required: true,
      },
      {
        model: Group,
        attributes: [],
        required: true,
      },
    ],
    where: {
      groupid: req.query.groupid,
      yearid: req.query.yearid,
      departmentid: req.query.departmentid,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      students,
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
    displayid: req.body.DisplayID,
    firstname: req.body.firstname,
    secondname: req.body.secondname,
    thirdname: req.body.thirdname,
    lastname: req.body.lastname,
    cardid: req.body.cardID,
    departmentid: req.body.departmentId,
    yearid: req.body.yearid,
    groupid: req.body.groupid,
    userid: req.body.userid,
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
  const [updatedRows] = await Student.update(
    {
      displayid: req.body.DisplayID,
      firstname: req.body.firstname,
      secondname: req.body.secondname,
      thirdname: req.body.thirdname,
      lastname: req.body.lastname,
      cardid: req.body.cardID,
      departmentid: req.body.departmentId,
      yearid: req.body.yearid,
      groupid: req.body.groupid,
    },
    {
      where: {
        studentid: req.body.studentid,
      },
    }
  );

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
