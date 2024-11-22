const { Student } = require('../models/centralizedExports');

exports.getAllStudents = async (req, res) => {
  try {
    const student = await Student.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.CreateStudent = async (req, res) => {
  try {
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

    res.status(200).json({
      status: 'success',
      data: {
        newStudent,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.studentid);

    res.status(200).json({
      status: 'success',
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    // Filter out undefined fields from the request body
    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    });

    // Perform the update only with the fields provided in the request
    const [updatedRows] = await Student.update(updates, {
      where: {
        studentid: req.params.studentid,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Student updated successfully!',
      rowsAffected: updatedRows,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message || err,
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const deletedRows = await Student.destroy({
      where: {
        studentid: req.params.studentid,
      },
    });

    res.status(200).json({
      status: 'successful',
      message: `Student with studentid = (${req.params.student}) deleted succesfuly`,
      rowsAffected: deletedRows,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
    console.log(err);
  }
};
