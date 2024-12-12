const {
  Attendance,
  Course,
  Student,
  sequelize,
} = require('../models/centralizedExports');

const formattedDate = require('../utils/getFormattedDate');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const getDate = require('../utils/getFormattedDate');

// this count attendances for a specific department
exports.countAllAttendances = catchAsync(async (req, res, next) => {
  const departmentid = req.params.departmentid;

  const totalAttendance = await Attendance.findAll({
    attributes: [
      [
        sequelize.fn('COUNT', sequelize.col('attendanceid')),
        'totalAttendances',
      ],
    ],
    include: [
      {
        model: Course,
        attributes: [],
        required: true,
        where: {
          departmentid: departmentid,
        },
      },
    ],
    raw: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      totalAttendance,
    },
  });
});

exports.getAllAttendances = catchAsync(async (req, res, next) => {
  const { departmentid, yearid, course, semester, group } = req.query;
  const currentDate = getDate();

  // Build the `where` clause dynamically
  const whereClause = {};

  if (departmentid) {
    whereClause['$course.departmentid$'] = departmentid;
  }

  if (yearid) {
    whereClause['$course.yearid$'] = yearid;
  }

  if (course) {
    whereClause['$course.courseid$'] = course;
  }

  if (semester) {
    whereClause['$course.semester$'] = semester;
  }

  if (group) {
    whereClause['$student.groupid$'] = group;
  }

  if (currentDate) {
    whereClause['$attendancedate$'] = currentDate;
  }

  const attendance = await Attendance.findAll({
    attributes: [
      [sequelize.col('course.semester'), 'semester'],
      [sequelize.col('course.coursename'), 'coursename'],
      'attendancedate',
      'attendancestatus',
      [
        sequelize.fn(
          'concat',
          sequelize.col('student.firstname'),
          ' ',
          sequelize.col('student.secondname'),
          ' ',
          sequelize.col('student.thirdname'),
          ' ',
          sequelize.col('student.lastname')
        ),
        'studentName',
      ],
      [sequelize.col('student.displayid'), 'ID'],
    ],
    include: [
      {
        model: Student,
        attributes: [],
        required: true,
      },
      {
        model: Course,
        attributes: [],
        required: true,
      },
    ],
    where: whereClause, // Apply the dynamic filters
    order: sequelize.col('studentName'),
    raw: true,
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
    attributes: [
      'studentid',
      'firstname',
      'secondname',
      'thirdname',
      'lastname',
    ],
    where: { cardid: req.body.cardID },
    raw: true,
  });

  if (!studentInfo) {
    return next(
      new AppError(
        `there is no student with that cardID ${req.body.cardID}`,
        404
      )
    );
  }

  // check if there is an attendance for the specified student
  const currentDate = formattedDate();
  const hasAttendance = await Attendance.findOne({
    where: {
      studentid: studentInfo.studentid,
      courseid: req.body.course,
      attendancedate: currentDate,
    },
    raw: true,
  });

  const studentName =
    studentInfo.firstname +
    ' ' +
    studentInfo.secondname +
    ' ' +
    studentInfo.thirdname +
    ' ' +
    studentInfo.lastname;

  if (hasAttendance) {
    return next(
      new AppError(`${studentName} already attended this class`, 409)
    );
  }

  // If everything ok , create attendance
  const newAttendance = await Attendance.create({
    attendancedate: currentDate,
    attendancestatus: req.body.attendanceStatus,
    studentid: studentInfo.studentid,
    courseid: req.body.course,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newAttendance,
    },
  });
});

exports.createAbsent = catchAsync(async (req, res, next) => {
  // get only the student id
  const studentInfo = await Student.findAll({
    attributes: ['studentid'],
    where: {
      departmentid: req.body.departmentid,
      yearid: req.body.yearid,
      groupid: req.body.groupid,
    },
    raw: true,
  });

  if (!studentInfo) {
    return next(new AppError(`there is no students`, 404));
  }

  // check if there is an attendance for all students
  const currentDate = formattedDate();
  const hasAttendance = await Attendance.findAll({
    attributes: ['studentid'],
    where: {
      courseid: req.body.courseid,
      attendancedate: currentDate,
    },
    raw: true,
  });

  // Extract arrays of IDs
  const allStudentIds = studentInfo.map((student) => student.studentid);
  const attendedStudentIds = hasAttendance.map(
    (attendance) => attendance.studentid
  );

  // Find students who did not attend
  const absentStudentIds = allStudentIds.filter(
    (id) => !attendedStudentIds.includes(id)
  );

  if (absentStudentIds === 0) {
    res.status(200).json({
      status: 'success',
      message: `All students have attended.`,
    });
  }

  if (absentStudentIds > 0) {
    const absentRecords = absentStudentIds.map((id) => ({
      studentid: id,
      courseid: req.body.courseid,
      attendancedate: currentDate,
      attendancestatus: req.body.attendanceStatus,
    }));

    await Attendance.bulkCreate(absentRecords);
  }

  res.status(201).json({
    status: 'success',
    message: `${absentStudentIds.length}`,
  });
});
