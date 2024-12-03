const {
  Attendance,
  Course,
  Student,
  CollegeYear,
  Department,
  sequelize,
} = require('../models/centralizedExports');

const formattedDate = require('../utils/getFormattedDate');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllAttendances = catchAsync(async (req, res, next) => {
  const attendance = await Attendance.findAll({
    attributes: [
      [sequelize.col('Course.semester'), 'semester'],
      [sequelize.col('Course.coursename'), 'coursename'],
      'attendancedate',
      'attendancestatus',
      [
        sequelize.fn(
          'concat',
          sequelize.col('Student.firstname'),
          ' ',
          sequelize.col('Student.secondname'),
          ' ',
          sequelize.col('Student.thirdname'),
          ' ',
          sequelize.col('Student.lastname')
        ),
        'StudentName',
      ],
      'attendanceid',
    ],
    include: [
      {
        model: Student,
        attributes: [], // No need to include individual student fields as we're concatenating them
        required: true,
      },
      {
        model: Course,
        attributes: [], // No need to include individual course fields
        required: true,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    result: attendance.length,
    data: {
      attendance,
    },
  });
});

exports.CreateAttendance = catchAsync(async (req, res, next) => {
  // get student based on card id
  const studentInfo = await Student.findOne({
    attributes: ['studentid'],
    where: { cardid: req.body.cardID },
    raw: true,
  });

  if (!studentInfo) {
    return next(new AppError('there is no student with that cardID', 404));
  }

  // get course id
  const course = await Course.findOne({
    attributes: ['courseid'],
    where: { coursename: req.body.coursename },
    raw: true,
  });

  if (!course) {
    return next(
      new AppError(
        `there is no course with this name ${req.body.coursename}`,
        404
      )
    );
  }

  // check if there is an attendance for the specified student
  const hasAttendance = await Attendance.findOne({
    where: { studentid: studentInfo.studentid },
  });

  if (hasAttendance) {
    return next(new AppError('the student already attended this class', 200));
  }

  // If everything ok , create attendance
  const currentDate = formattedDate();

  const newAttendance = await Attendance.create({
    attendancedate: currentDate,
    attendancestatus: req.body.attendancestatus,
    studentid: studentInfo.studentid,
    courseid: course.courseid,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newAttendance,
    },
  });
});
