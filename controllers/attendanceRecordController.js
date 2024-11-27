const {
  Attendance,
  Course,
  Student,
  CollegeYear,
  Department,
  sequelize,
} = require('../models/centralizedExports');
const getCardID = require('../arduino/serialReader');
const formattedDate = require('../utils/getFormattedDate');

exports.getAllAttendances = async (req, res) => {
  try {
    const attendance = await Attendance.findAll();

    res.status(200).json({
      status: 'success',
      result: attendance.length,
      data: {
        attendance,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.CreateAttendance = async (req, res) => {
  try {
    // get student based on card id
    const studentInfo = await Student.findOne({
      attributes: ['studentid'],
      where: { cardid: req.body.cardID },
      raw: true,
    });

    if (!studentInfo) {
      return res.status(404).json({
        status: 'fail',
        message: 'there is no student with this card id',
      });
    }

    // get course id based on a query consist of joining tables
    const course = await Course.findOne({
      attributes: ['courseid'],
      include: [
        {
          model: Department,
          attributes: [], // no need to get any attributes from departments table
          required: true,
        },
        {
          model: CollegeYear,
          attributes: [], // no need to get any attributes from college years table
          required: true,
        },
      ],
      where: { coursename: req.body.coursename },
      raw: true,
    });

    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: `there is no course with this name : ${req.body.coursename}`,
      });
    }

    // check if there is an attendance for the specified student
    const hasAttendance = await Attendance.findOne({
      where: { studentid: studentInfo.studentid },
    });

    if (hasAttendance) {
      return res.status(200).json({
        status: 'success',
        message: 'the student already attended this class',
      });
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
